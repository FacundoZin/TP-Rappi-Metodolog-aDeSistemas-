import { Injectable } from '@nestjs/common';
import { Result } from 'src/common/result/Result';
import { VendorOrderInfoDto } from 'src/vendorsAccount/Application/dto/vendor-order-info.dto';
import { IVendorProvider } from 'src/vendorsAccount/Domain/port/IVendorProvider';

Injectable();
export class VendorAdapter implements IVendorProvider {
  ProvideContactInfo(
    idVendor: string,
  ): Promise<Result<{ name: string; email: string }>> {
    throw new Error('Method not implemented.');
  }

  ProvideVendorEmail(idRestaurant): Promise<VendorOrderInfoDto> {
    throw new Error('Method not implemented.');
  }
}
