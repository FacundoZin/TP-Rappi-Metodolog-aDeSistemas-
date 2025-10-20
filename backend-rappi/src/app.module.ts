import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { UsersModule } from './users/users.module';
import { VendorsModule } from './vendors/vendors.module';

@Module({
  imports: [
    UsersModule,
    RestaurantsModule,
    VendorsModule,
    OrdersModule,
    AuthModule,
  ],
})
export class AppModule {}
