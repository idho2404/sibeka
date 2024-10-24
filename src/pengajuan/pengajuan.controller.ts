import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { PengajuanService } from './pengajuan.service';
import { CreatePengajuanDto } from '../dto/pengajuan/create-pengajuan.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('pengajuan')
export class PengajuanController {
  constructor(private readonly pengajuanService: PengajuanService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createPengajuan(
    @Req() req,
    @Body() createPengajuanDto: CreatePengajuanDto,
  ) {
    const userId = req.user['userId']; // Pastikan userId diambil dari JWT auth
    console.log('User ID from JWT:', userId); // Tambahkan log ini untuk memastikan userId benar
    return this.pengajuanService.createPengajuan(userId, createPengajuanDto);
  }
}
