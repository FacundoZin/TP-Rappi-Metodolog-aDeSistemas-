import { Module } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { VendorAdapter } from './Infrastructure/vendor-adapter';

@Module({
  providers: [VendorsService, VendorAdapter],
  exports: [VendorsService, VendorAdapter],
})
export class VendorsModule {}
