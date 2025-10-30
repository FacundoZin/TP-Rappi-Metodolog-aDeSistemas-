import { Injectable } from '@nestjs/common';
import { IVendorProvider } from 'src/vendors/Domain/port/IVendorProvider';
import { VendorOrderInfoDto } from 'src/vendors/dto/vendor-order-info.dto';

Injectable();
export class VendorAdapter implements IVendorProvider {
  ProvideVendorEmail(idRestaurant): Promise<VendorOrderInfoDto> {
    throw new Error('Method not implemented.');
  }
}
