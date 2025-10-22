import { Restaurant, RestaurantCategory } from "src/restaurants/entities/restaurant.entity";

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
