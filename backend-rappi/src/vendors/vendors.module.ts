import { Module } from '@nestjs/common';
import { VendorAdapter } from './Infrastructure/Adapter/vendor-adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserVendor } from './Domain/entities/vendor.entity';
import { VENDOR_ACCOUNT_SERVICE } from './Domain/serviceInterface/IVendorAccountService';
import { VendorAccountService } from './Application/Services/vendor-account-service';

@Module({
  imports: [TypeOrmModule.forFeature([UserVendor])],
  providers: [
    {
      provide: VENDOR_ACCOUNT_SERVICE,
      useClass: VendorAccountService,
    },
    VendorAdapter,
  ],
  exports: [VENDOR_ACCOUNT_SERVICE, VendorAdapter],
})
export class VendorsModule {}
