import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { RestaurantsModule } from './restaurants/restaurants.module';

import { CarritoModule } from './carrito/carrito.module';
import { UserGatewayModule } from './Gateways/UserGateway/user-gateway.module';
import { VendorGatewayModule } from './Gateways/VendorGateway/vendor-gateway.module';
import { UsersAccountModule } from './usersAccount/userAccount.module';
import { VendorsAccountModule } from './vendorsAccount/vendors.module';

@Module({
  imports: [
    UsersAccountModule,
    RestaurantsModule,
    VendorsAccountModule,
    OrdersModule,
    AuthModule,
    CarritoModule,
    UserGatewayModule,
    VendorGatewayModule,
  ],
})
export class AppModule {}
