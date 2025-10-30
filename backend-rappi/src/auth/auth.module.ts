import { Module } from '@nestjs/common';
import { GoogleAuthAdapter } from './Adapter/auth-adapter';
import { AuthUserService } from './services/auth-user-service';

@Module({
  providers: [GoogleAuthAdapter, AuthUserService],
  exports: [GoogleAuthAdapter, AuthUserService],
})
export class AuthModule {}
