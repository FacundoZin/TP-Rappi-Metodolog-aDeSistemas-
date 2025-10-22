import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantQueries } from './Queries/Restaurant.Queries';
import { RestaurantUserService } from './restaurant.user.service';
import { ProducVendorService } from './product.vendor.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant])],
  providers: [RestaurantUserService, RestaurantQueries, ProducVendorService],
  exports: [RestaurantUserService, ProducVendorService],
})
export class RestaurantsModule {}
