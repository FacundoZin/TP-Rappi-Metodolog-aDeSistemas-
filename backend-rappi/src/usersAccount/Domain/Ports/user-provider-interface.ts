import { Result } from 'src/common/result/Result';
import { UserInfoForOrderDto } from 'src/usersAccount/Aplication/dto/user/provide-user-info.dto';

export interface IUserProvider {
  ProvideUserInfoForOrder(
    idUser: string,
    idAddres: string,
  ): Promise<Result<UserInfoForOrderDto>>;

  ProvideFavoritesRestaurants(idUser: string): Promise<string[]>;

  ProvideContactInfo(
    idUser: string,
  ): Promise<Result<{ name: string; email: string }>>;
}

export const USER_PROVIDER = Symbol('IUserProvider');
