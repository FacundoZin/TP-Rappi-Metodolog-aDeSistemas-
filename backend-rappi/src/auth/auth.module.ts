import { Module } from '@nestjs/common';
import { GoogleAuthAdapter } from './Adapter/auth-adapter';
import { AuthUserService } from './services/auth-user-service';
import { AuthVendorService } from './services/auth-vendor-service';

@Module({
  providers: [GoogleAuthAdapter, AuthUserService, AuthVendorService],
  exports: [GoogleAuthAdapter, AuthUserService, AuthVendorService],
})
export class AuthModule {}
