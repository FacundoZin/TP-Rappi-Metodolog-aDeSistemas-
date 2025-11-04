import { Module } from '@nestjs/common';
import { OrdersModule } from 'src/orders/orders.module';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { VendorsModule } from 'src/vendors/vendors.module';
import { VendorAccountController } from './Controllers/vendor-account-controller';
import { VendorOrderController } from './Controllers/vendor-order-controller';
import { VendorRestaurantController } from './Controllers/vendor-restaurant-controller';

@Module({
  imports: [VendorsModule, RestaurantsModule, OrdersModule],
  controllers: [
    VendorAccountController,
    VendorOrderController,
    VendorRestaurantController,
  ],
})
export class UserGatewayModule {}
