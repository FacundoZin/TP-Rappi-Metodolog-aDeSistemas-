import { Module } from '@nestjs/common';
import { VendorOrderService } from './Application/Services/vendor-order-service';
import { UserOrderService } from './Application/Services/user-order-service';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './Domain/entities/order.entity';
import { USER_ORDER_SERVICE } from './Domain/ServiceInterfaces/IUserOrderService';
import { VENDOR_ORDER_SERVICE } from './Domain/ServiceInterfaces/IVendorOrderService';
import { VendorsAccountModule } from 'src/vendorsAccount/vendors.module';

@Module({
  imports: [
    RestaurantsModule,
    VendorsAccountModule,
    TypeOrmModule.forFeature([Order]),
  ],
  providers: [
    {
      provide: VENDOR_ORDER_SERVICE,
      useClass: VendorOrderService,
    },
    {
      provide: USER_ORDER_SERVICE,
      useClass: UserOrderService,
    },
  ],
  exports: [VENDOR_ORDER_SERVICE, USER_ORDER_SERVICE],
})
export class OrdersModule {}
