import { Result } from 'src/common/result/Result';
import { SearchRestaurantQueryObject } from 'src/restaurants/Application/Dtos/QueryObjects/SearchRestaurantsQueryObject';
import { RestaurantPreviewDto } from 'src/restaurants/Application/Dtos/Restaurant/Output/preview-restuarant.dto';
import { RestaurantViewDto } from 'src/restaurants/Application/Dtos/Restaurant/Output/view-restaurant.dto';
import { ReviewDto } from 'src/restaurants/Application/Dtos/Reviews/Output/review.dto';

export interface IRestaurantPublicService {
  searchRestaurants(
    filters: SearchRestaurantQueryObject,
  ): Promise<Result<RestaurantPreviewDto[]>>;

  GetRestaurantById(Id: string): Promise<Result<RestaurantViewDto>>;

  getRestaurantsReviews(
    idRestaurant: string,
  ): Promise<Result<ReviewDto[] | []>>;

  getFavoritesRestaurants(
    idsFavoritos: string[],
  ): Promise<Result<RestaurantPreviewDto[]>>;
}

export const RESTAURANT_PUBLIC_SERVICE = Symbol('IRestaurantPublicService');
