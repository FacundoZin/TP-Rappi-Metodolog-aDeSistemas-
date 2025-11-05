import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';
import { CreateUserDto } from 'src/users/Aplication/dto/user/create-user.dto';
import type { IUsersAccountService } from 'src/users/Domain/serviceInterfaces/IUser-accout-service';
import { USERS_ACCOUNT_SERVICE } from 'src/users/Domain/serviceInterfaces/IUser-accout-service';

@Controller('user/account')
@UseGuards(JwtAuthGuard)
export class UserAccountController {
  constructor(
    @Inject(USERS_ACCOUNT_SERVICE)
    private readonly userAccountService: IUsersAccountService,
  ) {}

  @Post('register')
  @HttpCode(201)
  async register(@Body() createUserDto: CreateUserDto) {
    const result = await this.userAccountService.UserRegister(createUserDto);

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }

    return result.data;
  }

  @Post('login')
  async login(@Body('googleToken') googleToken: string) {
    const result = await this.userAccountService.UserLogin(googleToken);

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }

    return result.data;
  }
}
