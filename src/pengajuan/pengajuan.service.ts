import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePengajuanDto } from '../dto/pengajuan/create-pengajuan.dto';

@Injectable()
export class PengajuanService {
  constructor(private readonly prisma: PrismaService) {}

  async createPengajuan(
    userId: string,
    createPengajuanDto: CreatePengajuanDto,
  ) {
    const {
      id_konseli,
      id_konselor,
      tanggal_1,
      jam_1,
      tanggal_2,
      jam_2,
      jk_konselor,
      pengaju,
      ditemani,
    } = createPengajuanDto;

    let konseliId = id_konseli;
    let konselorId = id_konselor;

    // Jika pengaju adalah konseli
    if (pengaju === 'konseli') {
      const konseli = await this.prisma.konseli.findUnique({
        where: { userId }, // Menggunakan userId dari request yang diotentikasi
      });
      if (!konseli) {
        throw new NotFoundException('Konseli tidak ditemukan.');
      }
      konseliId = konseli.id_konseli;
      konselorId = null; // Kosongkan id_konselor jika pengaju adalah konseli
    }

    // Jika pengaju adalah konselor
    if (pengaju === 'konselor') {
      const konselor = await this.prisma.konselor.findUnique({
        where: { userId }, // Menggunakan userId dari request yang diotentikasi
      });
      if (!konselor) {
        throw new NotFoundException('Konselor tidak ditemukan.');
      }
      konselorId = konselor.id_konselor;

      // Verifikasi id_konseli dari input apakah ada di database
      const validKonseli = await this.prisma.konseli.findUnique({
        where: { id_konseli },
      });
      if (!validKonseli) {
        throw new BadRequestException('ID Konseli yang diberikan tidak valid.');
      }
    }

    // Buat pengajuan baru
    const pengajuan = await this.prisma.pengajuan.create({
      data: {
        id_konseli: konseliId,
        id_konselor: konselorId,
        tanggal_1: new Date(tanggal_1),
        jam_1,
        tanggal_2: tanggal_2 ? new Date(tanggal_2) : null,
        jam_2: jam_2 || null,
        jk_konselor,
        pengaju,
        ditemani,
        status: 'Menunggu Konfirmasi',
      },
    });

    return pengajuan;
  }
}
