import { Controller, UseGuards } from '@nestjs/common';

@Controller('vendor/restaurant')
@UseGuards(AuthGuard)
export class VendorRestaurantController {
  constructor() {}
}
