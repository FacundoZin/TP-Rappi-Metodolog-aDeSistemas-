import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Param,
  UseGuards,
} from '@nestjs/common';

@Controller('user/cart')
@UseGuards(AuthGuard)
export class UserCartController {
  constructor() {}
}
