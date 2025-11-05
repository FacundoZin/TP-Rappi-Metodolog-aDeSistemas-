import { Controller, Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';
import {
  USERS_ADDRESS_SERVICE,
  type IUsersAddressService,
} from 'src/users/Domain/serviceInterfaces/IUser-addres-service';

@Controller('user/addres')
@UseGuards(JwtAuthGuard)
export class UserAddresController {
  constructor(
    @Inject(USERS_ADDRESS_SERVICE)
    private readonly userAddressService: IUsersAddressService,
  ) {}
}
