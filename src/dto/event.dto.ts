import {
  IsDate,
  isNumber,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class EventDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  event_name!: string;

  @IsOptional()
  @IsString()
  poster!: string;

  @IsString()
  description!: string;

  @IsString()
  location!: string;

  @IsDate()
  event_date!: Date;

  @IsNumber()
  category_id!: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  ticket_price!: number;
}
