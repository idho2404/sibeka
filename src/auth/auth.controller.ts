import {
  Controller,
  Get,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './google-auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Endpoint untuk memulai Google SSO login (redirect ke Google)
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {
    // Redirect ke halaman Google untuk login
  }

  // Endpoint untuk menerima callback dari Google OAuth setelah login
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req: Request) {
    const user = req.user as {
      email: string;
      id: string;
      name: string;
      googleId: string;
      roles?: { role: { name: string } }[];
    };

    if (!user) {
      throw new UnauthorizedException('Google login failed');
    }

    // Setelah login, buat JWT dan kembalikan response dengan user data
    return this.authService.login(user);
  }
}
