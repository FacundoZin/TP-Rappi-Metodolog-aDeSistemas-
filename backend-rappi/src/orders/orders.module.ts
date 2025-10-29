import { Module } from '@nestjs/common';
import { ProductAdapter } from 'src/restaurants/Infraestructure/Adapters/product-adapter';
import { RestaurantAdapter } from 'src/restaurants/Infraestructure/Adapters/restaurant-adapter';
import { VendorOrderService } from './Application/Services/vendor-order-service';
import { UserOrderService } from './Application/Services/user-order-service';
import { VendorAdapter } from 'src/vendors/Infrastructure/vendor-adapter';

@Module({
  imports: [ProductAdapter, RestaurantAdapter, VendorAdapter],
  providers: [VendorOrderService, UserOrderService],
  exports: [VendorOrderService, UserOrderService],
})
export class OrdersModule {}
