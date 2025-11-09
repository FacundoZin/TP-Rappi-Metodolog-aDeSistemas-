import { RestaurantAddress } from 'src/restaurants/domain/entities/restaurant-addres';
import { RestaurantCategory } from 'src/restaurants/domain/Enums/Restaurant.category';
import { RestaurantStatus } from 'src/restaurants/domain/Enums/Restaurant.status';

export class RestaurantInfoDto {
  id: string;
  name: string;
  description: string;
  category: RestaurantCategory;
  createdAt: Date;
  status: RestaurantStatus;
  address: RestaurantAddress;
}
