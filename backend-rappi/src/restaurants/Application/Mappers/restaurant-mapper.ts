import { Restaurant } from 'src/restaurants/domain/entities/restaurant.entity';
import { RestaurantOrderInfoDto } from '../Dtos/Restaurant/Output/order-info-restaurant.dto';
import { RestaurantInfoDto } from '../Dtos/Restaurant/Output/restaurant-info.dto';

export class RestaurantMapper {
  static ToOrderInfo(Restaurant: Restaurant): RestaurantOrderInfoDto {
    const fullAddress = `${Restaurant.address.street}, ${Restaurant.address.height}, ${Restaurant.address.city}, ${Restaurant.address.province}`;
    return {
      RestaurantName: Restaurant.name,
      RestaurantAddress: fullAddress,
    };
  }

  static ToRestaurantInfo(Restaurant: Restaurant): RestaurantInfoDto {
    return {
      id: Restaurant.id,
      name: Restaurant.name,
      description: Restaurant.description,
      category: Restaurant.category,
      createdAt: Restaurant.createdAt,
      status: Restaurant.status,
      address: Restaurant.address,
    };
  }
}
