import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';

@Controller('vendor/order')
@UseGuards(JwtAuthGuard)
export class VendorOrderController {
  constructor() {}
}
