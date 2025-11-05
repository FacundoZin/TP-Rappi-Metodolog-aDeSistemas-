import { Result } from 'src/common/result/Result';

export interface IVendorAccountService {
  VendorRegister(createVendorDto: any): Promise<Result<string>>;
  VendorLogin(googleToken: string): Promise<Result<string>>;
}

export const VENDOR_ACCOUNT_SERVICE = Symbol('IVendorAccountService');
