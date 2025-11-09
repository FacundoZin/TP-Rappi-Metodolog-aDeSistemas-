import { RestaurantOrderInfoDto } from 'src/restaurants/Application/Dtos/Restaurant/Output/order-info-restaurant.dto';
import { RestaurantBackofficeViewDto } from 'src/restaurants/Application/Dtos/Restaurant/Output/restaurant-Backoffice-view.dto';

export interface IRestaurantProvider {
  ProvideInfoToOrder(
    IdRestaurante: string,
  ): Promise<RestaurantOrderInfoDto | null>;
  ProvideRestaurantsPendings(): Promise<RestaurantBackofficeViewDto>;
}

export const RESTAURANT_PROVIDER = Symbol('IRestaurantProvider');
