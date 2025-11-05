import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';
import { CreateVendorDto } from 'src/vendors/Application/dto/create-vendor.dto';
import { LogingVendorDto } from 'src/vendors/Application/dto/login-vendor.dto';
import {
  type IVendorAccountService,
  VENDOR_ACCOUNT_SERVICE,
} from 'src/vendors/Domain/serviceInterface/IVendorAccountService';

@Controller('vendor/account')
@UseGuards(JwtAuthGuard)
export class VendorAccountController {
  constructor(
    @Inject(VENDOR_ACCOUNT_SERVICE)
    private readonly vendorAccountService: IVendorAccountService,
  ) {}

  @Post('register')
  @HttpCode(201)
  async Register(@Body() dto: CreateVendorDto) {
    const result = await this.vendorAccountService.VendorRegister(dto);

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }
    return result.data;
  }

  @Post('login')
  @HttpCode(201)
  async Login(@Body() dto: LogingVendorDto) {
    const result = await this.vendorAccountService.VendorLogin(dto);

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }
    return result.data;
  }
}
