import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Param,
  UseGuards,
} from '@nestjs/common';

@Controller('user/account')
@UseGuards(AuthGuard)
export class UserAccountController {
  constructor() {}
}
