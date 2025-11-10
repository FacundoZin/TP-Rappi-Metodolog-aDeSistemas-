import { Module } from '@nestjs/common';
import { VendorOrderService } from './Application/Services/vendor-order-service';
import { UserOrderService } from './Application/Services/user-order-service';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './Domain/entities/order.entity';
import { USER_ORDER_SERVICE } from './Domain/ServiceInterfaces/IUserOrderService';
import { VENDOR_ORDER_SERVICE } from './Domain/ServiceInterfaces/IVendorOrderService';
import { VendorsAccountModule } from 'src/vendorsAccount/vendors.module';
import { EmailServie } from './Infraestructure/EmailService/email-service';
import { UsersAccountModule } from 'src/usersAccount/userAccount.module';
import { EMAIL_SERVICE } from './Domain/ServiceInterfaces/IEmailService';

@Module({
  imports: [
    RestaurantsModule,
    VendorsAccountModule,
    UsersAccountModule,
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
    {
      provide: EMAIL_SERVICE,
      useClass: EmailServie,
    },
  ],
  exports: [VENDOR_ORDER_SERVICE, USER_ORDER_SERVICE],
})
export class OrdersModule {}
