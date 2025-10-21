import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantQueries } from './Queries/Restaurant.Queries';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant])],
  providers: [RestaurantsService, RestaurantQueries],
  exports: [RestaurantsService],
})
export class RestaurantsModule {}
