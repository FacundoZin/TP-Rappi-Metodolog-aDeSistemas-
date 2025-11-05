import { Controller, Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';
import {
  USER_CART_SERVICE,
  type IUserCartService,
} from 'src/carrito/Domain/ServiceInterfaces/ICart-userService';

@Controller('user/cart')
@UseGuards(JwtAuthGuard)
export class UserCartController {
  constructor(
    @Inject(USER_CART_SERVICE)
    private readonly cartUserService: IUserCartService,
  ) {}
}
