import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantQueries } from './Infraestructure/Queries/Restaurant.Queries';
import { Restaurant } from './domain/entities/restaurant.entity';
import { RestaurantUserService } from './Application/Services/restaurant.user.service';
import { ProducVendorService } from './Application/Services/product.vendor.service';
import { ProductAdapter } from './Infraestructure/Adapters/product-adapter';
import { RestaurantAdapter } from './Infraestructure/Adapters/restaurant-adapter';
import { RestaurantAddress } from './domain/entities/restaurant-addres';
import { PRODUCT_VENDOR_SERVICE } from './domain/ServiceInterfaces/IProductVendorService';
import { RESTAURANT_ADDRESS_SERVICE } from './domain/ServiceInterfaces/IRestaurantAddressService';
import { RestauranAddressService } from './Application/Services/restaurant.address.service';
import { RESTAURANT_USER_SERVICE } from './domain/ServiceInterfaces/IRestaurantUserService';
import { RESTAURANT_VENDOR_SERVICE } from './domain/ServiceInterfaces/IRestaurantVendorService';
import { RestaurantVendorService } from './Application/Services/restaurant.vendor.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, RestaurantAddress])],
  providers: [
    RestaurantQueries,
    {
      provide: RESTAURANT_ADDRESS_SERVICE,
      useClass: RestauranAddressService,
    },
    {
      provide: PRODUCT_VENDOR_SERVICE,
      useClass: ProducVendorService,
    },
    {
      provide: RESTAURANT_USER_SERVICE,
      useClass: RestaurantUserService,
    },
    {
      provide: RESTAURANT_VENDOR_SERVICE,
      useClass: RestaurantVendorService,
    },
    ProductAdapter,
    RestaurantAdapter,
  ],
  exports: [
    RESTAURANT_ADDRESS_SERVICE,
    PRODUCT_VENDOR_SERVICE,
    RESTAURANT_USER_SERVICE,
    RESTAURANT_VENDOR_SERVICE,
    RestaurantAdapter,
    ProductAdapter,
  ],
})
export class RestaurantsModule {}
