import { Controller, Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';
import type { IUsersAccountService } from 'src/users/Domain/serviceInterfaces/IUser-accout-service';
import { USERS_ACCOUNT_SERVICE } from 'src/users/Domain/serviceInterfaces/IUser-accout-service';

@Controller('user/account')
@UseGuards(JwtAuthGuard)
export class UserAccountController {
  constructor(
    @Inject(USERS_ACCOUNT_SERVICE)
    private readonly userAccountService: IUsersAccountService,
  ) {}
}
