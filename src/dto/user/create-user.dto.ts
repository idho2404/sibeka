import { IsEmail, IsString, IsNotEmpty, IsArray, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsNotEmpty()
  @IsString()
  googleId?: string;

  // Menambahkan roleId untuk menghubungkan user dengan role
  @IsArray()
  @IsInt({ each: true })
  @IsNotEmpty()
  roles: number[]; // Array of role IDs, karena satu user bisa memiliki banyak role
}
