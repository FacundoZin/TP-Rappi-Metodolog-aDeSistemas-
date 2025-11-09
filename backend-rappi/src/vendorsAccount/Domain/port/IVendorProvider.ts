import { VendorOrderInfoDto } from 'src/vendorsAccount/Application/dto/vendor-order-info.dto';

export interface IVendorProvider {
  ProvideVendorEmail(idRestaurant: string): Promise<VendorOrderInfoDto>;
}
