import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserWithRoleDto } from '../../dto/user/user-role.dto';
import { JwtAuthGuard } from '../../auth/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('konseli')
  async getAllKonseli(): Promise<UserWithRoleDto[]> {
    return this.userService.getUsersByRole('konseli');
  }

  @UseGuards(JwtAuthGuard)
  @Get('konselor')
  async getAllKonselor(): Promise<UserWithRoleDto[]> {
    return this.userService.getUsersByRole('konselor');
  }

  @UseGuards(JwtAuthGuard)
  @Get('tim-konseling')
  async getAllTimKonseling(): Promise<UserWithRoleDto[]> {
    return this.userService.getUsersByRole('tim-konseling');
  }

  @UseGuards(JwtAuthGuard)
  @Get('pimpinan')
  async getAllPimpinan(): Promise<UserWithRoleDto[]> {
    return this.userService.getUsersByRole('pimpinan');
  }

  @UseGuards(JwtAuthGuard)
  @Get('konseli/:id')
  async getKonseliById(
    @Param('id') id: string,
  ): Promise<UserWithRoleDto | null> {
    return this.userService.getUserByRoleAndId('konseli', id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('konselor/:id')
  async getKonselorById(
    @Param('id') id: string,
  ): Promise<UserWithRoleDto | null> {
    return this.userService.getUserByRoleAndId('konselor', id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('tim-konseling/:id')
  async getTimKonselingById(
    @Param('id') id: string,
  ): Promise<UserWithRoleDto | null> {
    return this.userService.getUserByRoleAndId('tim-konseling', id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('pimpinan/:id')
  async getPimpinanById(
    @Param('id') id: string,
  ): Promise<UserWithRoleDto | null> {
    return this.userService.getUserByRoleAndId('pimpinan', id);
  }
}
