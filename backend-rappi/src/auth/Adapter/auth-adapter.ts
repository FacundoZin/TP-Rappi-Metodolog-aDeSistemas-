import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { InfoGoogleToken } from '../dto/info-google-token.dto';

@Injectable()
export class GoogleAuthAdapter {
  private client: OAuth2Client;

  constructor() {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async verifyGoogleToken(idToken: string): Promise<InfoGoogleToken> {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload) throw new UnauthorizedException('Token inválido');

      return {
        googleId: payload.sub!,
        email: payload.email!,
        name: payload.name ?? null,
      };
    } catch (error) {
      console.error('Error verificando token de Google:', error);
      throw new UnauthorizedException('Error verificando token de Google');
    }
  }
}
