import { RestaurantOrderInfoDto } from 'src/restaurants/Application/Dtos/Restaurant/Output/order-info-restaurant.dto';
import { RestaurantBackofficeViewDto } from 'src/common/Dtos/restaurant-Backoffice-view.dto';
import { Result } from 'src/common/result/Result';

export interface IRestaurantProvider {
  ProvideInfoToOrder(
    IdRestaurante: string,
  ): Promise<RestaurantOrderInfoDto | null>;
  ProvideRestaurantsPendings(): Promise<Result<RestaurantBackofficeViewDto[]>>;
}

export const RESTAURANT_PROVIDER = Symbol('IRestaurantProvider');
