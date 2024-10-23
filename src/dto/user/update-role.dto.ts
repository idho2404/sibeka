import { IsArray, IsString, IsNotEmpty } from 'class-validator';

export class UpdateRolesDto {
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  roles: string[]; // Array string yang berisi nama-nama role yang dipilih
}
