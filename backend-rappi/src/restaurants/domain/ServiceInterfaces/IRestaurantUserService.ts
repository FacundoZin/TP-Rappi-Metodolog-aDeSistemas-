import { Result } from 'src/common/result/Result';
import { SearchRestaurantQueryObject } from 'src/restaurants/Application/dto/QueryObjects/SearchRestaurantsQueryObject';
import { RestaurantPreviewDto } from 'src/restaurants/Application/dto/Restaurant/Output/preview-restuarant.dto';
import { RestaurantViewDto } from 'src/restaurants/Application/dto/Restaurant/Output/view-restaurant.dto';

export interface IRestaurantUserService {
  searchRestaurants(
    filters: SearchRestaurantQueryObject,
  ): Promise<Result<RestaurantPreviewDto[]>>;

  GetRestaurantById(Id: string): Promise<Result<RestaurantViewDto>>;
}

// Symbol para inyección en módulos
export const RESTAURANT_USER_SERVICE = Symbol('IRestaurantUserService');
