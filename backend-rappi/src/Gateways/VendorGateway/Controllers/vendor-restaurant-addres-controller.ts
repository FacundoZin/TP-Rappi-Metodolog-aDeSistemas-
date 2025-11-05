import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';

@Controller('vendor/restaurantAddres')
@UseGuards(JwtAuthGuard)
export class VendorRestaurantAddressController {
  constructor() {}
}
