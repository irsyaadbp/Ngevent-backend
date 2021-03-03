import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import { getRepository } from "typeorm";
import { User } from "../entities/user.entity";
import {
  DataStoredInToken,
  RequestWithUser,
} from "../interfaces/auth.interface";

async function authMiddleware(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const auth = req.headers.authorization;

  if (auth) {
    try {
      const secret = process.env.JWT_SECRET_KEY || "SECRET_KEY";
      const token = (auth as string).split("Bearer ")[1];
      const verificationResponse = JWT.verify(
        token,
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
