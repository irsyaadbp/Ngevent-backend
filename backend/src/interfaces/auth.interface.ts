import { Request } from "express";
import { User } from "../entities/user.entity";

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface DataStoredInToken {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface RequestWithUser extends Request {
  user?: User;
}
