import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';

@Controller('vendor/restaurant')
@UseGuards(JwtAuthGuard)
export class VendorRestaurantController {
  constructor() {}
}
