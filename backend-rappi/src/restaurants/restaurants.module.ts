import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantQueries } from './Infraestructure/Queries/Restaurant.Queries';
import { Restaurant } from './domain/entities/restaurant.entity';
import { RestaurantUserService } from './Application/Services/restaurant.user.service';
import { ProducVendorService } from './Application/Services/product.vendor.service';
import { ProductAdapter } from './Infraestructure/Adapters/product-adapter';
import { RestaurantAdapter } from './Infraestructure/Adapters/restaurant-adapter';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant])],
  providers: [
    RestaurantUserService,
    RestaurantQueries,
    ProducVendorService,
    ProductAdapter,
    RestaurantAdapter,
  ],
  exports: [
    RestaurantUserService,
    ProducVendorService,
    RestaurantAdapter,
    ProductAdapter,
  ],
})
export class RestaurantsModule {}
