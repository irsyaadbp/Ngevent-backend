import { User } from "../entities/user.entity";
import { DataStoredInToken, TokenData } from "../interfaces/auth.interface";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";

export default class EncryptData {
  public createJWT(user: User): TokenData {
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
