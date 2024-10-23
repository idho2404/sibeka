import {
  Controller,
  Put,
  Body,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { UpdateRolesDto } from '../../dto/user/update-role.dto';
import { JwtAuthGuard } from '../../auth/jwt.guard';

@Controller('user')
export class RoleController {
  constructor(private readonly userService: RoleService) {}

  @UseGuards(JwtAuthGuard) // Melindungi endpoint dengan JWT Authentication
  @Put('update-role/:userId')
  async updateUserRoles(
    @Param('userId') userId: string, // Mengambil userId dari parameter URL
    @Body() updateRolesDto: UpdateRolesDto,
  ) {
    try {
      const updatedUser = await this.userService.updateUserRoles(
        userId,
        updateRolesDto,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'User roles updated successfully',
        data: updatedUser,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update user roles',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
