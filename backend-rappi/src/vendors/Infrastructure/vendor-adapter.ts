import { Injectable } from '@nestjs/common';
import { IVendorProvider } from '../Domain/port/IVendorProvider';

Injectable();
export class VendorAdapter implements IVendorProvider {
  ProvideVendorEmail(idRestaurant: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
