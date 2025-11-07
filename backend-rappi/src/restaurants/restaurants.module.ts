import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantQueries } from './Infraestructure/Queries/Restaurant.Queries';
import { Restaurant } from './domain/entities/restaurant.entity';
import { ProductAdapter } from './Infraestructure/Adapters/product-adapter';
import { RestaurantAdapter } from './Infraestructure/Adapters/restaurant-adapter';
import { RestaurantAddress } from './domain/entities/restaurant-addres';
import { RestauranAddressManager } from './Application/Services/restaurantAddressManager';
import { ProducManager } from './Application/Services/productManager';
import { RestaurantManager } from './Application/Services/restaurantManager';
import { RestaurantPublicService } from './Application/Services/restaurantPublicService';
import { RESTAURANT_ADDRESS_MANAGER } from './domain/ServiceInterfaces/IRestaurantAddresManager';
import { PRODUCT_MANAGER } from './domain/ServiceInterfaces/IproductManager';
import { RESTAURANT_PUBLIC_SERVICE } from './domain/ServiceInterfaces/IRestaurantPublicService';
import { RESTAURANT_MANAGER } from './domain/ServiceInterfaces/IRestaurantManager';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, RestaurantAddress])],
  providers: [
    RestaurantQueries,
    {
      provide: RESTAURANT_ADDRESS_MANAGER,
      useClass: RestauranAddressManager,
    },
    {
      provide: PRODUCT_MANAGER,
      useClass: ProducManager,
    },
    {
      provide: RESTAURANT_PUBLIC_SERVICE,
      useClass: RestaurantPublicService,
    },
    {
      provide: RESTAURANT_MANAGER,
      useClass: RestaurantManager,
    },
    ProductAdapter,
    RestaurantAdapter,
  ],
  exports: [
    RESTAURANT_ADDRESS_MANAGER,
    PRODUCT_MANAGER,
    RESTAURANT_PUBLIC_SERVICE,
    RESTAURANT_MANAGER,
    RestaurantAdapter,
    ProductAdapter,
  ],
})
export class RestaurantsModule {}
