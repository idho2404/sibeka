// src/services/profile.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateKonseliDto } from '../dto/profile/konseli.dto';
import { UpdateKonselorDto } from '../dto/profile/konselor.dto';
import { UpdateTimKonselingDto } from '../dto/profile/tim-konseling.dto';
import { UpdatePimpinanDto } from '../dto/profile/pimpinan.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getKonseli(userId: string) {
    const konseli = await this.prisma.konseli.findUnique({ where: { userId } });
    if (!konseli) throw new NotFoundException('Konseli not found');
    return konseli;
  }

  async updateKonseli(userId: string, updateKonseliDto: UpdateKonseliDto) {
    // Ensure the `tanggal_lahir` is a Date object if it's provided
    if (updateKonseliDto.tanggal_lahir) {
      updateKonseliDto.tanggal_lahir = new Date(updateKonseliDto.tanggal_lahir);
    }
    return this.prisma.konseli.update({
      where: { userId },
      data: updateKonseliDto,
    });
  }

  async getKonselor(userId: string) {
    const konselor = await this.prisma.konselor.findUnique({
      where: { userId },
      include: {
        jadwal: {
          include: {
            hari: true, // Mendapatkan informasi hari (misalnya: "Senin", "Selasa", dsb)
            jadwalJam: {
              include: {
                jam: true, // Mendapatkan informasi slot waktu (misalnya: "09:00-10:00")
              },
            },
          },
        },
      },
    });

    if (!konselor) throw new NotFoundException('Konselor not found');
    return konselor;
  }

  async updateKonselor(userId: string, updateKonselorDto: UpdateKonselorDto) {
    // Ensure the `tanggal_lahir` is a Date object if it's provided
    if (updateKonselorDto.tanggal_lahir) {
      updateKonselorDto.tanggal_lahir = new Date(
        updateKonselorDto.tanggal_lahir,
      );
    }
    return this.prisma.konselor.update({
      where: { userId },
      data: updateKonselorDto,
    });
  }

  async getTimKonseling(userId: string) {
    const timKonseling = await this.prisma.timKonseling.findUnique({
      where: { userId },
    });
    if (!timKonseling) throw new NotFoundException('Tim Konseling not found');
    return timKonseling;
  }

  async updateTimKonseling(
    userId: string,
    updateTimKonselingDto: UpdateTimKonselingDto,
  ) {
    // Ensure the `tanggal_lahir` is a Date object if it's provided
    if (updateTimKonselingDto.tanggal_lahir) {
      updateTimKonselingDto.tanggal_lahir = new Date(
        updateTimKonselingDto.tanggal_lahir,
      );
    }
    return this.prisma.timKonseling.update({
      where: { userId },
      data: updateTimKonselingDto,
    });
  }

  async getPimpinan(userId: string) {
    const pimpinan = await this.prisma.pimpinan.findUnique({
      where: { userId },
    });
    if (!pimpinan) throw new NotFoundException('Pimpinan not found');
    return pimpinan;
  }

  async updatePimpinan(userId: string, updatePimpinanDto: UpdatePimpinanDto) {
    // Ensure the `tanggal_lahir` is a Date object if it's provided
    if (updatePimpinanDto.tanggal_lahir) {
      updatePimpinanDto.tanggal_lahir = new Date(
        updatePimpinanDto.tanggal_lahir,
      );
    }
    return this.prisma.pimpinan.update({
      where: { userId },
      data: updatePimpinanDto,
    });
  }
}
