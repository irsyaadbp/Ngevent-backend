import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { Role } from "../entities/user.entity.ts";

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  username!: string;

  @IsString()
  password!: string;

  @IsString()
  fullname!: string;

  @IsEnum(Role)
  role!: Role;

  @IsOptional()
  @IsNumber()
  favorite_id!: number;
}

export class LoginDto {
  @IsString()
  username!: string;

  @IsString()
  password!: string;
}
