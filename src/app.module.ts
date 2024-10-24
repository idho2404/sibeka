import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { RoleModule } from './user/role/role.module';
import { UserModule } from './user/user/user.module';
import { ScheduleModule } from './jadwal/jadwal.module';
import { PengajuanModule } from './pengajuan/pengajuan.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    ProfileModule,
    RoleModule,
    UserModule,
    ScheduleModule,
    PengajuanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
