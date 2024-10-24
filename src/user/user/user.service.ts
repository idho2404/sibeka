import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserWithRoleDto } from '../../dto/user/user-role.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsersByRole(role: string): Promise<UserWithRoleDto[]> {
    // Map for role-based Prisma model query
    const roleMapping = {
      konseli: this.prisma.konseli,
      konselor: this.prisma.konselor,
      'tim-konseling': this.prisma.timKonseling,
      pimpinan: this.prisma.pimpinan,
    };

    // Select the appropriate model based on the role
    const prismaModel = roleMapping[role];
    if (!prismaModel) {
      throw new Error('Invalid role');
    }

    // Execute a common query for the user data
    const users = await prismaModel.findMany({
      where: {
        user: {
          roles: {
            some: {
              role: {
                name: role, // Filter users by the role name
              },
            },
          },
        },
      },
      include: {
        user: { include: { roles: { include: { role: true } } } },
      },
    });

    // Throw an error if no data is found
    if (!users || users.length === 0) {
      throw new NotFoundException('Data tidak ditemukan');
    }

    // Return the standardized user response
    return users.map((item) => ({
      id: item.user.id,
      email: item.user.email,
      name: item.user.name,
      roles: item.user.roles.map((r) => r.role.name),
      additionalData: {
        nim: item.nim, // untuk konseli
        nip: item.nip, // untuk konselor, tim_konseling, dan pimpinan
        jenis_kelamin: item.jenis_kelamin,
        tanggal_lahir: item.tanggal_lahir,
        no_hp: item.no_hp,
        prodi: item.prodi, // khusus untuk konseli
        tingkat: item.tingkat, // khusus untuk konseli
        kelas: item.kelas, // khusus untuk konseli
      },
    }));
  }

  async getUserByRoleAndId(
    role: string,
    id: string,
  ): Promise<UserWithRoleDto | null> {
    // Map for role-based Prisma model query
    const roleMapping = {
      konseli: this.prisma.konseli,
      konselor: this.prisma.konselor,
      'tim-konseling': this.prisma.timKonseling,
      pimpinan: this.prisma.pimpinan,
    };

    // Select the appropriate model based on the role
    const prismaModel = roleMapping[role];
    if (!prismaModel) {
      throw new Error('Invalid role');
    }

    // Execute a common query for the user data
    const user = await prismaModel.findUnique({
      where: { userId: id },
      include: {
        user: { include: { roles: { include: { role: true } } } },
      },
    });

    if (!user) return null;

    // Return the standardized user response
    return {
      id: user.user.id,
      email: user.user.email,
      name: user.user.name,
      roles: user.user.roles.map((r) => r.role.name),
      additionalData: {
        nim: user.nim, // for konseli
        nip: user.nip, // for konselor, tim_konseling, and pimpinan
        jenis_kelamin: user.jenis_kelamin,
        tanggal_lahir: user.tanggal_lahir,
        no_hp: user.no_hp,
        prodi: user.prodi, // specific to konseli
        tingkat: user.tingkat, // specific to konseli
        kelas: user.kelas, // specific to konseli
      },
    };
  }
}
