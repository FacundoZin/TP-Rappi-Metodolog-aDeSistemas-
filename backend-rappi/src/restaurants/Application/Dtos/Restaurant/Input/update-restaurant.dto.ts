import { Restaurant } from 'src/restaurants/domain/entities/restaurant.entity';
import { RestaurantCategory } from 'src/restaurants/domain/Enums/Restaurant.category';

export class UpdateRestaurantDto {
  name: string;
  description: string;
  category: RestaurantCategory;

  toEntity(existingRestaurant: Restaurant): Restaurant {
    const restaurant = existingRestaurant;

    restaurant.name = this.name;
    restaurant.description = this.description;
    restaurant.category = this.category;

    return restaurant;
  }
}
