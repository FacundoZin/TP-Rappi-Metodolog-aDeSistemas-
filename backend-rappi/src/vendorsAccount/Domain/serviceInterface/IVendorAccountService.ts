import { Result } from 'src/common/result/Result';
import { CreateVendorDto } from 'src/vendorsAccount/Application/dto/create-vendor.dto';
import { LogingVendorDto } from 'src/vendorsAccount/Application/dto/login-vendor.dto';

export interface IVendorAccountService {
  VendorRegister(createVendorDto: CreateVendorDto): Promise<Result<string>>;
  VendorLogin(dto: LogingVendorDto): Promise<Result<string>>;
}

export const VENDOR_ACCOUNT_SERVICE = Symbol('IVendorAccountService');
