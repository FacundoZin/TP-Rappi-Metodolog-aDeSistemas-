import { Result } from 'src/common/result/Result';
import { CreateUserAddressDto } from 'src/usersAccount/Aplication/dto/addres/create-address.dto';
import { UserAddress } from '../entities/user-address.entity';

export interface IUsersAddressService {
  createAddress(
    userId: string,
    dto: CreateUserAddressDto,
  ): Promise<Result<UserAddress>>;

  dropAddress(addressId: string, userId: string): Promise<Result<string>>;
}

export const USERS_ADDRESS_SERVICE = Symbol('IUsersAddressService');
