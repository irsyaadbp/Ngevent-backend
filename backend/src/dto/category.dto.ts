import { IsNumber, IsOptional, IsString } from "class-validator";

export class CategoryDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  category_name!: string;

  @IsString()
  description!: string;
}
