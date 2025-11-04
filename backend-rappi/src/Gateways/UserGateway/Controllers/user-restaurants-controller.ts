import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Param,
  UseGuards,
} from '@nestjs/common';

@Controller('user/restaurants')
@UseGuards(AuthGuard)
export class UserRestaurantsController {
  constructor() {}
}
