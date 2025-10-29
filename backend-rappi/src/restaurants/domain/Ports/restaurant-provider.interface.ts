import { RestaurantOrderInfoDto } from 'src/restaurants/Application/dto/Restaurant/Output/order-info-restaurant.dto';

export interface IRestaurantProvider {
  ProvideInfoToOrder(
    IdRestaurante: string,
  ): Promise<RestaurantOrderInfoDto | null>;
}
