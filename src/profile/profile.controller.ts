// src/controllers/profile.controller.ts
import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Request } from 'express';
import { UpdateKonseliDto } from '../dto/profile/konseli.dto';
import { UpdateKonselorDto } from '../dto/profile/konselor.dto';
import { UpdateTimKonselingDto } from '../dto/profile/tim-konseling.dto';
import { UpdatePimpinanDto } from '../dto/profile/pimpinan.dto';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('konseli')
  async getKonseli(@Req() req: Request) {
    const userId = req.user['userId'];
    return this.profileService.getKonseli(userId);
  }

  @Patch('konseli')
  async updateKonseli(
    @Req() req: Request,
    @Body() updateKonseliDto: UpdateKonseliDto,
  ) {
    const userId = req.user['userId'];
    return this.profileService.updateKonseli(userId, updateKonseliDto);
  }

  @Get('konselor')
  async getKonselor(@Req() req: Request) {
    const userId = req.user['userId'];
    return this.profileService.getKonselor(userId);
  }

  @Patch('konselor')
  async updateKonselor(
    @Req() req: Request,
    @Body() updateKonselorDto: UpdateKonselorDto,
  ) {
    const userId = req.user['userId'];
    return this.profileService.updateKonselor(userId, updateKonselorDto);
  }

  @Get('tim-konseling')
  async getTimKonseling(@Req() req: Request) {
    const userId = req.user['userId'];
    return this.profileService.getTimKonseling(userId);
  }

  @Patch('tim-konseling')
  async updateTimKonseling(
    @Req() req: Request,
    @Body() updateTimKonselingDto: UpdateTimKonselingDto,
  ) {
    const userId = req.user['userId'];
    return this.profileService.updateTimKonseling(
      userId,
      updateTimKonselingDto,
    );
  }

  @Get('pimpinan')
  async getPimpinan(@Req() req: Request) {
    const userId = req.user['userId'];
    return this.profileService.getPimpinan(userId);
  }

  @Patch('pimpinan')
  async updatePimpinan(
    @Req() req: Request,
    @Body() updatePimpinanDto: UpdatePimpinanDto,
  ) {
    const userId = req.user['userId'];
    return this.profileService.updatePimpinan(userId, updatePimpinanDto);
  }
}
