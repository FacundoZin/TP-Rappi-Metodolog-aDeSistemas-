import { VendorOrderInfoDto } from 'src/vendors/Application/dto/vendor-order-info.dto';

export interface IVendorProvider {
  ProvideVendorEmail(idRestaurant: string): Promise<VendorOrderInfoDto>;
}
