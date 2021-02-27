import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import { getRepository } from "typeorm";
import { User } from "../entities/user.entity.ts";
import {
  DataStoredInToken,
  RequestWithUser,
} from "../interfaces/auth.interface";

async function authMiddleware(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const cookies = req.cookies;

  if (cookies && cookies.token) {
    const secret = process.env.JWT_SECRET_KEY || "SECRET_KEY";
    try {
      const verificationResponse = JWT.verify(
        cookies.token,
        secret
      ) as DataStoredInToken;
      const id = verificationResponse.id;
      const repository = getRepository(User);
      const user = await repository.findOne({ id });
      if (user) {
        req.user = user;
        next();
      } else {
        res
          .status(401)
          .json({
            status: false,
            message: "User not found",
          })
          .end();
      }
    } catch (error) {
      res
        .status(401)
        .json({
          status: false,
          message: error.message,
        })
        .end();
    }
  } else {
    res
      .status(401)
      .json({
        status: false,
        message: "You must send token",
      })
      .end();
  }
}

export default authMiddleware;
