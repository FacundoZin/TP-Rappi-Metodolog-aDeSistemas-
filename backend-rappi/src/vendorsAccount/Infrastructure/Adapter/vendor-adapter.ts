import { Injectable } from '@nestjs/common';
import { VendorOrderInfoDto } from 'src/vendorsAccount/Application/dto/vendor-order-info.dto';
import { IVendorProvider } from 'src/vendorsAccount/Domain/port/IVendorProvider';

Injectable();
export class VendorAdapter implements IVendorProvider {
  ProvideVendorEmail(idRestaurant): Promise<VendorOrderInfoDto> {
    throw new Error('Method not implemented.');
  }
}
