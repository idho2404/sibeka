import { Module } from '@nestjs/common';
import { PengajuanController } from './pengajuan.controller';
import { PengajuanService } from './pengajuan.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Mengimpor PrismaModule untuk akses database
  controllers: [PengajuanController], // Daftar controller yang terkait dengan konseli
  providers: [PengajuanService], // Daftar service yang terkait dengan konseli
})
export class PengajuanModule {}
