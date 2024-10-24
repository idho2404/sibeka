import {
  IsString,
  IsArray,
  IsNotEmpty,
  ValidateNested,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

class ScheduleInput {
  @IsString()
  @IsNotEmpty()
  hari: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  jam: string[];
}

export class CreateUpdateMultiScheduleDto {
  @IsString()
  @IsNotEmpty()
  id_konselor: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ScheduleInput)
  schedules: ScheduleInput[];
}
