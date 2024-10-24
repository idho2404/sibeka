import { Module } from '@nestjs/common';
import { ScheduleService } from './jadwal.service';
import { ScheduleController } from './jadwal.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [NestScheduleModule.forRoot()],
  providers: [ScheduleService, PrismaService],
  controllers: [ScheduleController],
})
export class ScheduleModule {}
