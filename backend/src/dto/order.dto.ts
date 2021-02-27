import { IsNumber, IsOptional, IsString } from "class-validator";
import { Status } from "../entities/order.entity.ts";

export class OrderDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsNumber()
  event_id!: number;

  @IsNumber()
  qty!: number;

  @IsOptional()
  @IsString()
  status?: Status;

  @IsNumber({ maxDecimalPlaces: 2 })
  total_price!: number;
}
