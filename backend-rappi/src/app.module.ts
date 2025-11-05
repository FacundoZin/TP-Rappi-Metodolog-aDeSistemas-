import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { UsersModule } from './users/users.module';
import { VendorsModule } from './vendors/vendors.module';
import { CarritoModule } from './carrito/carrito.module';
import { UserGatewayModule } from './Gateways/UserGateway/user-gateway.module';
import { VendorGatewayModule } from './Gateways/VendorGateway/vendor-gateway.module';

@Module({
  imports: [
    UsersModule,
    RestaurantsModule,
    VendorsModule,
    OrdersModule,
    AuthModule,
    CarritoModule,
    UserGatewayModule,
    VendorGatewayModule,
  ],
})
export class AppModule {}
