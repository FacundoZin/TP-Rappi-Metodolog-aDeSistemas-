import { Result } from 'src/common/result/Result';
import { CreateRestaurantDto } from 'src/restaurants/Application/Dtos/Restaurant/Input/create-restaurant.dto';
import { UpdateRestaurantDto } from 'src/restaurants/Application/Dtos/Restaurant/Input/update-restaurant.dto';

export interface IRestaurantManager {
  CreateRestaurant(dto: CreateRestaurantDto): Promise<Result<string>>;
  UpdateRestaurant(
    Id: string,
    dto: UpdateRestaurantDto,
  ): Promise<Result<number>>;
}

// Symbol para inyección en módulos
export const RESTAURANT_MANAGER = Symbol('IRestaurantManager');
