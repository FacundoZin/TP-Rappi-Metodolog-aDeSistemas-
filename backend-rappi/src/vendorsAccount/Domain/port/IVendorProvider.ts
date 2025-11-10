import { Result } from 'src/common/result/Result';
import { VendorOrderInfoDto } from 'src/vendorsAccount/Application/dto/vendor-order-info.dto';

export interface IVendorProvider {
  ProvideVendorEmail(idRestaurant: string): Promise<VendorOrderInfoDto>;
  ProvideContactInfo(
    idVendor: string,
  ): Promise<Result<{ name: string; email: string }>>;
}

export const VENDOR_PROVIDER = Symbol('IVendorProvider');
