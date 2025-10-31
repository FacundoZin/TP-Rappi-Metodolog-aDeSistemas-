import { Injectable } from '@nestjs/common';
import { CreateVendorTokenDto } from '../dto/input/create-vendor-token.dto';

@Injectable()
export class AuthVendorService {
  async generateJwt(
    createVendorTokenDto: CreateVendorTokenDto,
  ): Promise<string> {}
}
