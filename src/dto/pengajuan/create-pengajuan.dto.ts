import { IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class CreatePengajuanDto {
  @IsString()
  id_konseli: string;

  @IsOptional()
  @IsString()
  id_konselor?: string;

  @IsDateString()
  tanggal_1: string;

  @IsString()
  jam_1: string;

  @IsOptional()
  @IsDateString()
  tanggal_2?: string;

  @IsOptional()
  @IsString()
  jam_2?: string;

  @IsString()
  jk_konselor: string;

  @IsString()
  pengaju: string;

  @IsBoolean()
  ditemani: boolean;
}
