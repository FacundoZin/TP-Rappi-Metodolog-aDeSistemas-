import { Restaurant } from 'src/restaurants/domain/entities/restaurant.entity';
import { RestaurantOrderInfoDto } from '../Dtos/Restaurant/Output/order-info-restaurant.dto';

export class RestaurantMapper {
  static ToOrderInfo(Restaurant: Restaurant): RestaurantOrderInfoDto {
    const fullAddress = `${Restaurant.address.street}, ${Restaurant.address.Heigth}, ${Restaurant.address.city}, ${Restaurant.address.province}`;
    return {
      RestaurantName: Restaurant.name,
      RestaurantAddress: fullAddress,
    };
  }
}
