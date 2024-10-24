import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ScheduleService } from './jadwal.service';
import { CreateUpdateMultiScheduleDto } from '../dto/jadwal/create-update-multi-schedule.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('schedule') // Pastikan path ini benar
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upsert')
  async upsertMultipleSchedules(
    @Body() createUpdateMultiScheduleDto: CreateUpdateMultiScheduleDto,
  ) {
    return this.scheduleService.upsertMultipleSchedules(
      createUpdateMultiScheduleDto,
    );
  }
}
