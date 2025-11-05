import { Result } from 'src/common/result/Result';
import { CreateRestaurantAddressDto } from 'src/restaurants/Application/dto/Addres/Input/create.restaurantAddress.dto';
import { UpdateRestaurantAddressDto } from 'src/restaurants/Application/dto/Addres/Input/update-restaurantAddress.dto';

export interface IRestaurantAddressService {
  createAddress(dto: CreateRestaurantAddressDto): Promise<Result<string>>;
  updateAddress(
    id: string,
    dto: UpdateRestaurantAddressDto,
  ): Promise<Result<number>>;
  deleteAddress(id: string): Promise<Result<number>>;
}

// Symbol para inyección en módulos
export const RESTAURANT_ADDRESS_SERVICE = Symbol('IRestaurantAddressService');
