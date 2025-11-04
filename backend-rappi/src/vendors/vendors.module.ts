import { Module } from '@nestjs/common';
import { VendorAdapter } from './Infrastructure/Adapter/vendor-adapter';
import { VendorsService } from './Application/Services/vendor-account-service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserVendor } from './Domain/entities/vendor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserVendor])],
  providers: [VendorsService, VendorAdapter],
  exports: [VendorsService, VendorAdapter],
})
export class VendorsModule {}
