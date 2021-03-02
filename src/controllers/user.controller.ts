import { getRepository, Like } from "typeorm";
import EncryptData from "../common/encrypt";
import { Pagination } from "../common/pagination";
import Upload from "../common/upload";
import {
  ChangeAvatarDto,
  ChangePasswordDto,
  EditUserDto,
} from "../dto/user.dto";
import { User } from "../entities/user.entity";
import { RequestWithUser } from "../interfaces/auth.interface";
import Controller, {
  AppResponse,
  PaginateResponse,
} from "../interfaces/controller.interface";
import { ParamsQuery } from "../interfaces/params.interface";

export default class UserController implements Controller<User> {
  private repository = getRepository(User);
  public getAll = async (req: RequestWithUser, res: PaginateResponse<User>) => {
    try {
      const params: ParamsQuery & { keySearch?: string } = req.query;

      const pagination = new Pagination().pagination(params);

      const limit = pagination.limit;
      const page = pagination.page;
      const offset = pagination.offset;
      const sortBy = params.sortBy || "updated_at";
      const orderBy = (params.orderBy || "DESC").toUpperCase();
      const keySearch = params.keySearch || "username";

      const [allUsers, count] = await this.repository.findAndCount({
        where: { [keySearch]: Like("%" + (params.search || "") + "%") },
        order: { [sortBy]: orderBy },
        take: limit,
        skip: offset,
      });

      return res.json({
        success: true,
        message: count > 0 ? "Success get all users data" : "Data empty",
        count: count,
        currentPage: page,
        perPage: limit,
        allPage: Math.ceil(count / limit),
        data: allUsers,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

  public getById = async (req: RequestWithUser, res: AppResponse<User>) => {
    try {
      const params: { id?: number } = req.params;

      if (params.id) {
        const user = await this.repository.findOne(
          {
            id: params.id,
          },
          { relations: ["category"] }
        );

        if (user?.id) {
          return res.json({
            success: true,
            message: "Success get user",
            data: user,
          });
        } else {
          return res.json({
            success: false,
            message: "User id not found",
            data: undefined,
          });
        }
      } else {
        return res.json({
          success: false,
          message: "User id cant be empty",
          data: undefined,
        });
      }
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
        data: undefined,
      });
    }
  };

  public createNew = async (_: RequestWithUser, res: AppResponse<User>) => {
    return res.status(400).json({
      success: false,
      message: "Please create via register",
    });
  };

  public update = async (req: RequestWithUser, res: AppResponse<User>) => {
    try {
      const { id, ...data }: EditUserDto = req.body;

      if (id) {
        const isEmailExist = await this.isExist("email", data.email);

        if (isEmailExist?.id && isEmailExist.id !== id) {
          return res.json({
            success: false,
            message: "Email already exist",
          });
        }

        const isUsernameExist = await this.isExist("username", data.email);
        if (isUsernameExist?.id && isUsernameExist.id !== id) {
          return res.json({
            success: false,
            message: "Username already exist",
          });
        }

        const selectedUser = await this.repository.findOne(id);
        if (!selectedUser?.id) {
          return res.json({
            success: false,
            message: "User id not found",
          });
        }

        const updated = await this.repository.save({
          ...selectedUser,
          ...data,
        });

        return res.status(200).json({
          success: false,
          message: "User updated",
          data: updated,
        });
      } else {
        return res.json({
          success: false,
          message: "User id cant be empty",
        });
      }
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

  public delete = async (req: RequestWithUser, res: AppResponse<User>) => {
    try {
      const id = req.body.id;

      if (id) {
        await this.repository.delete(id);
        return res.json({
          success: true,
          message: "Delete user success",
        });
      } else {
        return res.json({
          success: false,
          message: "User id cant be empty",
        });
      }
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

  public changePassword = async (
    req: RequestWithUser,
    res: AppResponse<User>
  ) => {
    try {
      const { id, password }: ChangePasswordDto = req.body;

      if (id) {
        const selectedUser = await this.repository.findOne(id);
        if (!selectedUser?.id) {
          return res.json({
            success: false,
            message: "User not found",
          });
        }
        const encryptData = new EncryptData();
        const encryptPassword = await encryptData.encrypt(password);

        const updated = await this.repository.save({
          password: encryptPassword,
        });

        const { password: dbPassword, ...dataUpdated } = updated;
        return res.status(200).json({
          success: false,
          message: "Password updated",
          data: dataUpdated,
        });
      } else {
        return res.json({
          success: false,
          message: "User id cant be empty",
        });
      }
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

  public changeAvatar = async (
    req: RequestWithUser,
    res: AppResponse<User>
  ) => {
    try {
      const { id }: ChangeAvatarDto = req.body;
      if (id) {
        if (req.file) {
          const cloudinary = new Upload();
          const avatar = await cloudinary.uploadImage({ file: req.file.path });

          const updated = await this.repository.save({
            avatar: avatar.url,
          });

          const { password, ...dataUpdated } = updated;

          return res.status(201).json({
            success: false,
            message: "Avatar updated",
            data: dataUpdated,
          });
        } else {
          return res.status(400).json({
            success: false,
            message: "Avatar can't be empty",
          });
        }
      } else {
        return res.json({
          success: false,
          message: "User id cant be empty",
        });
      }
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

  private isExist = async (column: string, value: string) => {
    return await this.repository.findOne({ where: { [column]: value } });
  };
}
