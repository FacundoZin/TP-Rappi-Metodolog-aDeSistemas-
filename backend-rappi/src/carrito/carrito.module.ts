import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Rutas relativas
import { RestaurantsModule } from '../restaurants/restaurants.module';
import { CartItem } from './Domain/entities/cart-item.entity';
import { Cart } from './Domain/entities/cart.entity';

// Services e interfaces
import { UserCartService } from './Application/Services/cart-user-service';
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
