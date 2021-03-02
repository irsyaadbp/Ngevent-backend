import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { LoginDto, RegisterDto } from "../dto/auth.dto";
import { User } from "../entities/user.entity";
import { RequestWithUser } from "../interfaces/auth.interface";
import EncryptData from "../common/encrypt";

export class AuthController {
  private repository = getRepository(User);
  private encryptData = new EncryptData();

  public register = async (req: Request, res: Response) => {
    const data: RegisterDto = req.body;

    const isEmailExist = await this.isExist("email", data.email);

    if (isEmailExist) {
      res.json({
        success: false,
        message: "Email already taken",
      }).end;

      return;
    }
    const isUsernameExist = await this.isExist("username", data.username);

    if (isUsernameExist) {
      res.json({
        success: false,
        message: "Username already taken",
      }).end;

      return;
    }

    const encryptPassword = await this.encryptData.encrypt(data.password);
    const newData = { ...data, password: encryptPassword };
    // const newUser = this.repository.create(newData);
    const newUser = await this.repository.save(newData);

    const { password, ...dataUser } = newUser;
    const tokenData = this.encryptData.createJWT(newUser);
    res.cookie("token", tokenData.token, {
      httpOnly: true,
      path: "/api",
    });

    res.json({
      success: true,
      message: "Register sucess",
      data: dataUser,
    });
  };

  public login = async (req: Request, res: Response) => {
    const data: LoginDto = req.body;

    const getUser = await this.repository.findOne({ username: data.username });

    if (getUser?.username) {
      const isPasswordMatching = await this.encryptData.compare(
        data.password,
        getUser.password
      );

      if (isPasswordMatching) {
        const { password, ...dataUser } = getUser;
        const tokenData = this.encryptData.createJWT(getUser);

        res.cookie("token", tokenData.token, {
          httpOnly: true,
          path: "/api",
        });
        res.json({
          success: true,
          message: "Login sucess",
          data: dataUser,
        });
      } else {
        res.json({
          success: false,
          message: "Password not match",
        });
      }
    } else {
      res.json({
        success: false,
        message: "Username not found",
      });
    }
  };

  public logout = async (_: RequestWithUser, res: Response) => {
    res
      .clearCookie("token", {
        httpOnly: true,
        path: "/api",
      })
      .json({
        success: true,
        message: "Logout success",
      });
  };

  private isExist = async (column: string, value: string) => {
    return (await this.repository.count({ where: { [column]: value } })) !== 0;
  };
}
