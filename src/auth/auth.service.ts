/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../dto/user/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // Memvalidasi atau membuat user baru berdasarkan email Google (SSO)
  async validateGoogleUser(email: string, name: string): Promise<any> {
    let user = await this.prisma.user.findUnique({
      where: { email },
      include: { roles: { include: { role: true } } },
    });

    // Jika user belum ada, buat user baru
    if (!user) {
      const konseliRole = await this.prisma.role.findUnique({
        where: { name: 'konseli' },
      });

      if (!konseliRole) {
        throw new Error('Role "konseli" not found in database');
      }

      // Membuat user baru beserta relasi role menggunakan Prisma nested create
      const createUserDto: CreateUserDto = {
        email,
        name,
        googleId: email,
        roles: [konseliRole.id],
      };

      user = await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          googleId: createUserDto.googleId,
          name: createUserDto.name,
          roles: {
            create: createUserDto.roles.map((roleId) => ({
              role: { connect: { id: roleId } },
            })),
          },
        },
        include: { roles: { include: { role: true } } },
      });

      // Ambil nim dari bagian sebelum '@stis.ac.id' di email
      const nim = email.split('@')[0];

      // Tambahkan ke tabel konselis
      await this.prisma.konseli.create({
        data: {
          nim: nim,
          user: { connect: { id: user.id } }, // Menghubungkan dengan user yang baru dibuat
        },
      });
    }

    return user;
  }

  // Membuat token JWT saat login dan mengembalikan informasi user
  async login(user: {
    email: string;
    id: string;
    googleId: string;
    name: string;
    roles?: { role: { name: string } }[];
  }) {
    // Mengambil semua nama role dari user
    const roles = user.roles?.map((r) => r.role.name) || [];

    const payload = {
      email: user.email,
      sub: user.id,
      name: user.name,
      roles, // Menyimpan semua role dalam bentuk array
    };

    const access_token = this.jwtService.sign(payload);

    return {
      userId: user.id,
      email: user.email,
      name: user.name,
      roles, // Mengembalikan array roles
      access_token,
    };
  }
}
