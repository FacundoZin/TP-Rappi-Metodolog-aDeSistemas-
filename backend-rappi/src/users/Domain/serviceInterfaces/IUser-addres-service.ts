import { Result } from 'src/common/result/Result';
import { UserAddress } from 'src/users/Domain/entities/user-address.entity';
import { CreateUserAddressDto } from 'src/users/Aplication/dto/addres/create-address.dto';

export interface IUsersAddressService {
  createAddress(
    userId: string,
    dto: CreateUserAddressDto,
  ): Promise<Result<UserAddress>>;

  dropAddress(addressId: string, userId: string): Promise<Result<string>>;
}

export const USERS_ADDRESS_SERVICE = Symbol('IUsersAddressService');
