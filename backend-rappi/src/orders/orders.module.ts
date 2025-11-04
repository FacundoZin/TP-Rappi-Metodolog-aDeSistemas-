import { Module } from '@nestjs/common';
import { VendorOrderService } from './Application/Services/vendor-order-service';
import { UserOrderService } from './Application/Services/user-order-service';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { VendorsModule } from 'src/vendors/vendors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './Domain/entities/order.entity';

@Module({
  imports: [
    RestaurantsModule,
    VendorsModule,
    TypeOrmModule.forFeature([Order]),
  ],
  providers: [VendorOrderService, UserOrderService],
  exports: [VendorOrderService, UserOrderService],
})
export class OrdersModule {}
