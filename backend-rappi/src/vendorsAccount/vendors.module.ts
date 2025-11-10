import { Module } from '@nestjs/common';
import { VendorAdapter } from './Infrastructure/Adapter/vendor-adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserVendor } from './Domain/entities/vendor.entity';
import { VENDOR_ACCOUNT_SERVICE } from './Domain/serviceInterface/IVendorAccountService';
import { VendorAccountService } from './Application/Services/vendor-account-service';
import { VENDOR_PROVIDER } from './Domain/port/IVendorProvider';

@Module({
  imports: [TypeOrmModule.forFeature([UserVendor])],
  providers: [
    {
      provide: VENDOR_ACCOUNT_SERVICE,
      useClass: VendorAccountService,
    },
    {
      provide: VENDOR_PROVIDER,
      useClass: VendorAdapter,
    },
  ],
  exports: [VENDOR_ACCOUNT_SERVICE, VENDOR_PROVIDER],
})
export class VendorsAccountModule {}
