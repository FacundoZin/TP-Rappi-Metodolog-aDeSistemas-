import { Module } from '@nestjs/common';
import { OrdersModule } from 'src/orders/orders.module';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { VendorAccountController } from './Controllers/vendorAccount-controller';
import { VendorOrdersController } from './Controllers/vendorOrders-controller';
import { restaurantAddressManagerController } from './Controllers/restaurantAddressManager-controller';
import { RestaurantManagerController } from './Controllers/restaurantManager-controller';
import { RestaurantProductsManagerController } from './Controllers/restaurantProductsManager-controller';
import { VendorsAccountModule } from 'src/vendorsAccount/vendors.module';
import { BackOfficeModule } from 'src/backOffice/backOffice.module';

@Module({
  imports: [
    VendorsAccountModule,
    RestaurantsModule,
    OrdersModule,
    BackOfficeModule,
  ],
  controllers: [
    VendorAccountController,
    VendorOrdersController,
    RestaurantManagerController,
    restaurantAddressManagerController,
    RestaurantProductsManagerController,
  ],
})
export class VendorGatewayModule {}
