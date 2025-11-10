import { Module } from '@nestjs/common';
import { CarritoModule } from 'src/carrito/carrito.module';
import { OrdersModule } from 'src/orders/orders.module';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { UserCartController } from './Controllers/userCart-controller';
import { UserOrdersController } from './Controllers/userOrders-controller';
import { searchRestaurantsController } from './Controllers/searchRestaurants-controller';
import { UserAccountController } from './Controllers/userAccount-controller';
import { UserAddresManagerController } from './Controllers/userAddressManager-controller';
import { UsersAccountModule } from 'src/usersAccount/userAccount.module';
import { UserFavoritesController } from './Controllers/favorites-restaurants-controller';
import { UserRewievsController } from './Controllers/user-reviews-controller';
import { UserClaimsController } from './Controllers/user-claims-controller';
import { VendorClaimsController } from '../VendorGateway/Controllers/vendor-claims-controller';
import { BackOfficeModule } from 'src/backOffice/backOffice.module';

@Module({
  imports: [
    UsersAccountModule,
    CarritoModule,
    OrdersModule,
    RestaurantsModule,
    BackOfficeModule,
  ],
  controllers: [
    UserFavoritesController,
    UserAccountController,
    UserAddresManagerController,
    UserCartController,
    UserOrdersController,
    searchRestaurantsController,
    UserRewievsController,
    UserClaimsController,
    VendorClaimsController,
  ],
})
export class UserGatewayModule {}
