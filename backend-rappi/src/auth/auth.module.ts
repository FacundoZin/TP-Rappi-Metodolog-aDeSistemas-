import { Global, Module } from '@nestjs/common';
import { GoogleAuthAdapter } from './Adapter/auth-adapter';
import { AuthUserService } from './services/auth-user-service';
import { AuthVendorService } from './services/auth-vendor-service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './Strategies/jwt.strategy';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey123', // usá variable de entorno en prod
      signOptions: { expiresIn: '7d' }, // el token dura 1 hora
    }),
  ],
  providers: [
    GoogleAuthAdapter,
    AuthUserService,
    AuthVendorService,
    JwtStrategy,
  ],
  exports: [GoogleAuthAdapter, AuthUserService, AuthVendorService],
})
export class AuthModule {}
