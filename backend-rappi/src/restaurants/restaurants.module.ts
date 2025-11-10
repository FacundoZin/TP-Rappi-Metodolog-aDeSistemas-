import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantQueries } from './Infraestructure/Queries/Restaurant.Queries';
import { Restaurant } from './domain/entities/restaurant.entity';
import { ProductAdapter } from './Infraestructure/Adapters/product-adapter';
import { RestaurantAdapter } from './Infraestructure/Adapters/restaurant-adapter';
import { RestaurantAddress } from './domain/entities/restaurant-addres';
import { RESTAURANT_ADDRESS_MANAGER } from './domain/ServiceInterfaces/Managment/IRestaurantAddresManager';
import { RESTAURANT_PUBLIC_SERVICE } from './domain/ServiceInterfaces/Discovery/IRestaurantPublicService';
import { RESTAURANT_MANAGER } from './domain/ServiceInterfaces/Managment/IRestaurantManager';
import { REVIEW_SERVICE } from './domain/ServiceInterfaces/Discovery/IReviewService';
import { ReviewService } from './Application/Services/Discovery/reviewService';
import { RestauranAddressManager } from './Application/Services/Managment/restaurantAddressManager';
import { ProducManager } from './Application/Services/Managment/productManager';
import { RestaurantPublicService } from './Application/Services/Discovery/restaurantPublicService';
import { RestaurantManager } from './Application/Services/Managment/restaurantManager';
import { PRODUCT_PROVIDER } from './domain/Ports/product-provider.interface';
import { RESTAURANT_PROVIDER } from './domain/Ports/restaurant-provider.interface';
import { REVIEW_PROVIDER } from './domain/Ports/reviews-provider.interface';
import { ReviewsAdapter } from './Infraestructure/Adapters/reviews-adapter';
import { PRODUCT_MANAGER } from './domain/ServiceInterfaces/Managment/IProductManager';
import { Product } from './domain/entities/product.entity';
import { Review } from './domain/entities/review.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant, RestaurantAddress, Product, Review]),
  ],
  providers: [
    RestaurantQueries,
    {
      provide: REVIEW_SERVICE,
      useClass: ReviewService,
    },
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
    {
      provide: PRODUCT_PROVIDER,
      useClass: ProductAdapter,
    },
    {
      provide: RESTAURANT_PROVIDER,
      useClass: RestaurantAdapter,
    },
    {
      provide: REVIEW_PROVIDER,
      useClass: ReviewsAdapter,
    },
  ],
  exports: [
    REVIEW_SERVICE,
    RESTAURANT_ADDRESS_MANAGER,
    PRODUCT_MANAGER,
    RESTAURANT_PUBLIC_SERVICE,
    RESTAURANT_MANAGER,
    PRODUCT_PROVIDER,
    RESTAURANT_PROVIDER,
    REVIEW_PROVIDER,
  ],
})
export class RestaurantsModule {}
