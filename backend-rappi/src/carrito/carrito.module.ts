import { Module } from '@nestjs/common';
import { UserCartService } from './Application/Services/cart-user-service';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './Domain/entities/cart-item.entity';
import { Cart } from './Domain/entities/cart.entity';
import { USER_CART_SERVICE } from './Domain/ServiceInterfaces/ICart-userService';

@Module({
  imports: [RestaurantsModule, TypeOrmModule.forFeature([Cart, CartItem])],
  providers: [
    {
      provide: USER_CART_SERVICE,
      useClass: UserCartService,
    },
  ],
  exports: [USER_CART_SERVICE],
})
export class CarritoModule {}
