/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateRolesDto } from '../../dto/user/update-role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async updateUserRoles(userId: string, updateRolesDto: UpdateRolesDto) {
    const { roles: selectedRoles } = updateRolesDto;

    // Ambil role yang ada saat ini dari user
    const existingRoles = await this.prisma.userRole.findMany({
      where: { userId },
      include: { role: true },
    });

    const existingRoleNames = existingRoles.map(
      (userRole) => userRole.role.name,
    );

    // Tentukan role yang harus dihapus dan yang harus ditambahkan
    const rolesToRemove = existingRoleNames.filter(
      (role) => !selectedRoles.includes(role),
    );
    const rolesToAdd = selectedRoles.filter(
      (role) => !existingRoleNames.includes(role),
    );

    // Proses role yang perlu dihapus
    await this.handleRolesToRemove(userId, rolesToRemove);

    // Proses role yang perlu ditambahkan
    await this.handleRolesToAdd(userId, rolesToAdd);

    return this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        roles: {
          select: {
            role: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }

  private async handleRolesToRemove(userId: string, rolesToRemove: string[]) {
    for (const roleName of rolesToRemove) {
      const role = await this.prisma.role.findUnique({
        where: { name: roleName },
      });

      if (roleName === 'konseli') {
        // Hapus data di tabel konseli
        await this.prisma.konseli.deleteMany({ where: { userId } });
      } else if (roleName === 'konselor') {
        // Set is_active ke false di tabel konselor
        await this.prisma.konselor.updateMany({
          where: { userId },
          data: { is_active: false },
        });
      } else if (roleName === 'tim konseling') {
        // Set is_active ke false di tabel tim konseling
        await this.prisma.timKonseling.updateMany({
          where: { userId },
          data: { is_active: false },
        });
      } else if (roleName === 'pimpinan') {
        // Set is_active ke false di tabel pimpinan
        await this.prisma.pimpinan.updateMany({
          where: { userId },
          data: { is_active: false },
        });
      }

      // Hapus role dari user
      await this.prisma.userRole.deleteMany({
        where: {
          userId,
          roleId: role?.id,
        },
      });
    }
  }

  private async handleRolesToAdd(userId: string, rolesToAdd: string[]) {
    for (const roleName of rolesToAdd) {
      const role = await this.prisma.role.findUnique({
        where: { name: roleName },
      });

      if (!role) {
        throw new HttpException(
          `Role ${roleName} not found in the database`,
          HttpStatus.BAD_REQUEST,
        );
      }

      if (roleName === 'konselor') {
        const existingKonselor = await this.prisma.konselor.findUnique({
          where: { userId },
        });
        if (existingKonselor) {
          await this.prisma.konselor.update({
            where: { userId },
            data: { is_active: true },
          });
        } else {
          const user = await this.prisma.user.findUnique({
            where: { id: userId },
          });
          await this.prisma.konselor.create({
            data: {
              userId: userId,
              is_active: true,
            },
          });
        }
      } else if (roleName === 'tim konseling') {
        const existingTimKonseling = await this.prisma.timKonseling.findUnique({
          where: { userId },
        });
        if (existingTimKonseling) {
          await this.prisma.timKonseling.update({
            where: { userId },
            data: { is_active: true },
          });
        } else {
          const user = await this.prisma.user.findUnique({
            where: { id: userId },
          });
          await this.prisma.timKonseling.create({
            data: {
              userId: userId,
              is_active: true,
            },
          });
        }
      } else if (roleName === 'pimpinan') {
        const existingPimpinan = await this.prisma.pimpinan.findUnique({
          where: { userId },
        });
        if (existingPimpinan) {
          await this.prisma.pimpinan.update({
            where: { userId },
            data: { is_active: true },
          });
        } else {
          const user = await this.prisma.user.findUnique({
            where: { id: userId },
          });
          await this.prisma.pimpinan.create({
            data: {
              userId: userId,
              is_active: true,
            },
          });
        }
      }

      // Tambahkan role ke user
      await this.prisma.userRole.create({
        data: {
          userId,
          roleId: role.id,
        },
      });
    }
  }
}
