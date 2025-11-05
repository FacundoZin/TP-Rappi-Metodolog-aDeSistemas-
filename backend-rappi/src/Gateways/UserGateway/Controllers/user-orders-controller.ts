import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';

@Controller('user/orders')
@UseGuards(JwtAuthGuard)
export class UserOrdersController {
  constructor() {}
}
