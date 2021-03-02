import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { Role } from "../entities/user.entity";

export class EditUserDto {
  @IsNumber()
  id!: number;

  @IsEmail()
  email!: string;

  @IsString()
  username!: string;

  @IsString()
  fullname!: string;

  @IsEnum(Role)
  role!: Role;

  @IsOptional()
  @IsNumber()
  favorite_id!: number;
}

export class ChangePasswordDto {
  @IsNumber()
  id!: number;

  @IsString()
  password!: string;
}

export class ChangeAvatarDto {
  @IsNumber()
  id!: number;
}
