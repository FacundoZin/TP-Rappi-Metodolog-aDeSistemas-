import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // lee el token del header Authorization
      ignoreExpiration: false, // si el token expiró, lo rechaza
      secretOrKey: process.env.JWT_SECRET || 'secretKey123', // clave para firmar/verificar tokens
    });
  }

  async validate(payload: any) {
    // esto se ejecuta AUTOMÁTICAMENTE cuando el token es válido
    // lo que retornes se guarda en req.user
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
