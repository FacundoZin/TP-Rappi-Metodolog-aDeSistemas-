import { CreateUserAddressDto } from '../addres/create-address.dto';

export class CreateUserDto {
  googleToken: string;
  createAddres: CreateUserAddressDto;
}
