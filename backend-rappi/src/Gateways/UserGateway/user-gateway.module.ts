import { Module } from '@nestjs/common';
import { CarritoModule } from 'src/carrito/carrito.module';
import { OrdersModule } from 'src/orders/orders.module';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { UsersModule } from 'src/users/users.module';
import { UserAccountController } from './Controllers/user-account-controller';
import { UserAddresController } from './Controllers/user-address-controller';
import { UserCartController } from './Controllers/user-cart-controller';
import { UserOrdersController } from './Controllers/user-orders-controller';
import { UserRestaurantsController } from './Controllers/user-restaurants-controller';

@Module({
  imports: [UsersModule, CarritoModule, OrdersModule, RestaurantsModule],
  controllers: [
    UserAccountController,
    UserAddresController,
    UserCartController,
    UserOrdersController,
    UserRestaurantsController,
  ],
})
export class UserGatewayModule {}
