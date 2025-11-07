import { Result } from 'src/common/result/Result';
import { CreateRestaurantAddressDto } from 'src/restaurants/Application/Dtos/Addres/Input/create.restaurantAddress.dto';
import { UpdateRestaurantAddressDto } from 'src/restaurants/Application/Dtos/Addres/Input/update-restaurantAddress.dto';

export interface IRestaurantAddressManager {
  createAddress(dto: CreateRestaurantAddressDto): Promise<Result<string>>;
  updateAddress(
    idAddres: string,
    dto: UpdateRestaurantAddressDto,
  ): Promise<Result<number>>;
  deleteAddress(idAddres: string): Promise<Result<number>>;
}

// Symbol para inyección en módulos
export const RESTAURANT_ADDRESS_MANAGER = Symbol('IRestaurantAddressManager');
