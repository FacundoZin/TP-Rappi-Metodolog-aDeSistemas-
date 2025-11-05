import { Result } from 'src/common/result/Result';
import { CreateRestaurantDto } from 'src/restaurants/Application/dto/Restaurant/Input/create-restaurant.dto';
import { UpdateRestaurantDto } from 'src/restaurants/Application/dto/Restaurant/Input/update-restaurant.dto';

export interface IRestaurantVendorService {
  CreateRestaurant(dto: CreateRestaurantDto): Promise<Result<string>>;
  UpdateRestaurant(
    Id: string,
    dto: UpdateRestaurantDto,
  ): Promise<Result<number>>;
}

// Symbol para inyección en módulos
export const RESTAURANT_VENDOR_SERVICE = Symbol('IRestaurantVendorService');
