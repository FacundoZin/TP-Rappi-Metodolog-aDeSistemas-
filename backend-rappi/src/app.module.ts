import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { CarritoModule } from './carrito/carrito.module';
import { UserGatewayModule } from './Gateways/UserGateway/user-gateway.module';
import { VendorGatewayModule } from './Gateways/VendorGateway/vendor-gateway.module';
import { UsersAccountModule } from './usersAccount/userAccount.module';
import { VendorsAccountModule } from './vendorsAccount/vendors.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders/Domain/entities/order.entity';
import { OrderItem } from './orders/Domain/entities/orderItem.entity';
import { UserVendor } from './vendorsAccount/Domain/entities/vendor.entity';
import { Restaurant } from './restaurants/domain/entities/restaurant.entity';
import { Cart } from './carrito/Domain/entities/cart.entity';
import { CartItem } from './carrito/Domain/entities/cart-item.entity';
import { RestaurantAddress } from './restaurants/domain/entities/restaurant-addres';
import { Product } from './restaurants/domain/entities/product.entity';
import { Review } from './restaurants/domain/entities/review.entity';
import { Favorites } from './usersAccount/Domain/entities/favortes.entity';
import { UserAddress } from './usersAccount/Domain/entities/user-address.entity';
import { User } from './usersAccount/Domain/entities/user.entity';
import { BackOfficeModule } from './backOffice/backOffice.module';
import { Claim } from './backOffice/Domain/Entities/claim.entity';
import { AdminGatewayModule } from './Gateways/AdminGateway/admin-gateway-module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME || 'nest_user',
      password: process.env.DB_PASSWORD || 'nest_password',
      database: process.env.DB_DATABASE || 'nest_db',
      entities: [
        // Lista TODAS las entidades. Asegúrate de que las rutas de importación sean válidas.
        Claim,
        Order,
        OrderItem,
        UserVendor,
        Restaurant,
        RestaurantAddress,
        Product,
        Review,
        Cart,
        CartItem,
        Favorites,
        UserAddress,
        User,
      ],
      synchronize: true, // OJO: Útil para desarrollo, pero PELIGROSO en producción
    }),
    BackOfficeModule,
    UsersAccountModule,
    RestaurantsModule,
    VendorsAccountModule,
    OrdersModule,
    AuthModule,
    CarritoModule,
    UserGatewayModule,
    VendorGatewayModule,
    AdminGatewayModule,
  ],
})
export class AppModule {}
