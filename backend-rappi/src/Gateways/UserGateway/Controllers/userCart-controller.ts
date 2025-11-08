import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';
import { AddItemToCartDto } from 'src/carrito/Application/dto/Input/AddItemToCart';
import {
  USER_CART_SERVICE,
  type IUserCartService,
} from 'src/carrito/Domain/ServiceInterfaces/ICart-userService';
import type { RequestWithUser } from 'src/common/HttpRequestWithUser/IRequestWithUser';

@Controller('user/cart')
@UseGuards(JwtAuthGuard)
export class UserCartController {
  constructor(
    @Inject(USER_CART_SERVICE)
    private readonly cartUserService: IUserCartService,
  ) {}

  @Post()
  @HttpCode(200)
  async addItemToCart(
    @Req() req: RequestWithUser,
    @Body() dto: AddItemToCartDto,
  ) {
    try {
      const cartUpdated = await this.cartUserService.addProductToCart(
        req.user.sub,
        dto,
      );

      return cartUpdated;
    } catch {
      throw new HttpException('algo fallo al actualizar el carrito', 500);
    }
  }

  @Delete(':productId')
  @HttpCode(200)
  async RemoveItemFromCart(
    @Req() req: RequestWithUser,
    @Param('productId') productId: string,
  ) {
    try {
      const CartUpdated = await this.cartUserService.removeProductFromCart(
        req.user.sub,
        productId,
      );
      return CartUpdated;
    } catch {
      throw new HttpException('algo fallo al actualizar el carrito', 500);
    }
  }

  @Patch(':productId')
  @HttpCode(200)
  async IncrementProduct(
    @Req() req: RequestWithUser,
    @Param('productId') productId: string,
    @Body('quantity', ParseIntPipe) newQuantity: number,
  ) {
    try {
      const CartUpdated = await this.cartUserService.UpdateProductQuantity(
        req.user.sub,
        productId,
        newQuantity,
      );
      return CartUpdated;
    } catch {
      throw new HttpException('algo fallo al actualizar el carrito', 500);
    }
  }

  @Get()
  async GetUserCart(@Req() req: RequestWithUser) {
    try {
      const Cart = await this.cartUserService.getCartByUser(req.user.sub);
      return Cart;
    } catch {
      throw new HttpException('algo fallo al buscar el carrito', 500);
    }
  }
}
