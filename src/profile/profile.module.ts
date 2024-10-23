import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Mengimpor PrismaModule untuk akses database
  controllers: [ProfileController], // Daftar controller yang terkait dengan konseli
  providers: [ProfileService], // Daftar service yang terkait dengan konseli
})
export class ProfileModule {}
