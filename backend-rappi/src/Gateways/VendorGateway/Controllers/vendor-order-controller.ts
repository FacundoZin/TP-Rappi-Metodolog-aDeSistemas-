import { Controller, UseGuards } from '@nestjs/common';

@Controller('vendor/order')
@UseGuards(AuthGuard)
export class VendorOrderController {
  constructor() {}
}
