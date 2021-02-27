import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { LoginDto, RegisterDto } from "../dto/auth.dto";
import { User } from "../entities/user.entity";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import {
  DataStoredInToken,
  RequestWithUser,
  TokenData,
} from "../interfaces/auth.interface";

export class AuthController {
  private repository = getRepository(User);

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

    const encryptPassword = await this.encrypt(data.password);
    const newData = { ...data, password: encryptPassword };
    // const newUser = this.repository.create(newData);
    const newUser = await this.repository.save(newData);

    const { password, ...dataUser } = newUser;
    const tokenData = this.createToken(newUser);
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
      const isPasswordMatching = await this.compare(
        data.password,
        getUser.password
      );

      if (isPasswordMatching) {
        const { password, ...dataUser } = getUser;
        const tokenData = this.createToken(getUser);
        // res.setHeader("Set-Cookie", [this.createCookie(tokenData)]);
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

  public logout = async (req: RequestWithUser, res: Response) => {
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

  private createToken(user: User): TokenData {
    const expiresIn = 24 * 60 * 60; // 1 Day = 24 Hrs = 24*60*60 = 86400.
    const secret = process.env.JWT_SECRET_KEY || "SECRET_KEY";
    const dataStoredInToken: DataStoredInToken = {
      id: user.id,
      email: user.email,
      role: user.role,
      username: user.username,
    };
    return {
      expiresIn,
      token: JWT.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }

  // private createCookie(tokenData: TokenData) {
  //   return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  // }

  public isExist = async (column: string, value: string) => {
    return (await this.repository.count({ where: { [column]: value } })) !== 0;
  };

  public encrypt = async (plainText: string) => {
    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plainText, salt);

    return hash;
  };

  public compare = async (input: string, hash: string) => {
    return await bcrypt.compare(input, hash);
  };
}
