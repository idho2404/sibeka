import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'], // 'profile' scope untuk mendapatkan nama pengguna
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { emails, displayName, name, id } = profile;

    // Ambil email dan nama pengguna dari profil Google
    const email = emails[0].value;
    const fullName = displayName || `${name.givenName} ${name.familyName}`;

    // Pass nama pengguna ke AuthService untuk disimpan dalam database
    const user = await this.authService.validateGoogleUser(email, fullName);

    // Pastikan untuk menyertakan id Google (googleId)
    user.googleId = id;

    done(null, user);
  }
}
