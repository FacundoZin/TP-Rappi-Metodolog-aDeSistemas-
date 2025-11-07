import { Result } from 'src/common/result/Result';
import { CreateUserDto } from 'src/users/Aplication/dto/user/create-user.dto';

export interface IUsersAccountService {
  UserRegister(createUserDto: CreateUserDto): Promise<Result<string>>;
  UserLogin(googleToken: string): Promise<Result<string>>;
}

export const USERS_ACCOUNT_SERVICE = Symbol('IUsersAccountService');
