import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Param,
  UseGuards,
} from '@nestjs/common';

@Controller('user/addres')
@UseGuards(AuthGuard)
export class UserAddresController {
  constructor() {}
}
