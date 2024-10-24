import { Injectable, NotFoundException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';
import { getNextDateForDay } from 'src/utils/jadwal.utils';
import { CreateUpdateMultiScheduleDto } from '../dto/jadwal/create-update-multi-schedule.dto';
import { addDays } from 'date-fns';

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  async upsertMultipleSchedules(
    createUpdateMultiScheduleDto: CreateUpdateMultiScheduleDto,
  ): Promise<any> {
    const { id_konselor, schedules } = createUpdateMultiScheduleDto;

    for (const schedule of schedules) {
      const { hari, jam } = schedule;
      const tanggal = getNextDateForDay(hari);

      const hariData = await this.prisma.hari.upsert({
        where: { nama_hari: hari.toLowerCase() },
        update: {},
        create: { nama_hari: hari.toLowerCase() },
      });

      const existingSchedule = await this.prisma.jadwal.findFirst({
        where: {
          id_konselor,
          id_hari: hariData.id_hari,
        },
        include: { jadwalJam: { include: { jam: true } } },
      });

      if (existingSchedule) {
        const existingJamIds = existingSchedule.jadwalJam.map(
          (jj) => jj.jam.waktu,
        );
        const jamToRemove = existingJamIds.filter(
          (waktu) => !jam.includes(waktu),
        );
        const jamToAdd = jam.filter((waktu) => !existingJamIds.includes(waktu));

        for (const timeSlot of jamToRemove) {
          const jamData = await this.prisma.jam.findUnique({
            where: { waktu: timeSlot },
          });
          if (jamData) {
            await this.prisma.jadwalJam.deleteMany({
              where: {
                id_jadwal: existingSchedule.id_jadwal,
                id_jam: jamData.id_jam,
              },
            });
          }
        }

        for (const timeSlot of jamToAdd) {
          const jamData = await this.prisma.jam.findUnique({
            where: { waktu: timeSlot },
          });

          if (!jamData) {
            throw new NotFoundException(`Jam ${timeSlot} tidak ditemukan.`);
          }

          await this.prisma.jadwalJam.create({
            data: {
              id_jadwal: existingSchedule.id_jadwal,
              id_jam: jamData.id_jam,
            },
          });
        }

        await this.prisma.jadwal.update({
          where: { id_jadwal: existingSchedule.id_jadwal },
          data: { tanggal },
        });
      } else {
        const newSchedule = await this.prisma.jadwal.create({
          data: {
            id_konselor,
            id_hari: hariData.id_hari,
            tanggal,
          },
        });

        for (const timeSlot of jam) {
          const jamData = await this.prisma.jam.findUnique({
            where: { waktu: timeSlot },
          });

          if (!jamData) {
            throw new NotFoundException(`Jam ${timeSlot} tidak ditemukan.`);
          }

          await this.prisma.jadwalJam.create({
            data: {
              id_jadwal: newSchedule.id_jadwal,
              id_jam: jamData.id_jam,
            },
          });
        }
      }
    }

    return { message: 'Jadwal berhasil diperbarui atau dibuat.' };
  }

  // Cron job that runs every week to update schedules
  @Cron(CronExpression.EVERY_WEEK) // Runs once every week
  async updateScheduleAutomatically(): Promise<void> {
    const allSchedules = await this.prisma.jadwal.findMany();

    for (const schedule of allSchedules) {
      const newDate = addDays(new Date(schedule.tanggal), 7);
      await this.prisma.jadwal.update({
        where: { id_jadwal: schedule.id_jadwal },
        data: { tanggal: newDate },
      });
    }
    console.log('Jadwal diperbarui otomatis untuk minggu berikutnya.');
  }
}
