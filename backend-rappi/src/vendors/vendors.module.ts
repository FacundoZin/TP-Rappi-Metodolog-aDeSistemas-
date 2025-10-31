import { Module } from '@nestjs/common';
import { VendorAdapter } from './Infrastructure/Adapter/vendor-adapter';
import { VendorsService } from './Application/Services/vendors.service';

@Module({
  providers: [VendorsService, VendorAdapter],
  exports: [VendorsService, VendorAdapter],
})
export class VendorsModule {}
