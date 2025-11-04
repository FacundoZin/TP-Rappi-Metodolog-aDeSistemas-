import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Param,
  UseGuards,
} from '@nestjs/common';

@Controller('user/orders')
@UseGuards(AuthGuard)
export class UserOrdersController {
  constructor() {}
}
