import { Controller, UseGuards } from '@nestjs/common';

@Controller('vendor/account')
@UseGuards(AuthGuard)
export class VendorAccountController {
  constructor() {}
}
