import { Result } from 'src/common/result/Result';
import { UserInfoForOrderDto } from 'src/usersAccount/Aplication/dto/user/provide-user-info.dto';

export interface IUserProviderInterface {
  ProvideUserInfoForOrder(
    idUser: string,
    idAddres: string,
  ): Promise<Result<UserInfoForOrderDto>>;
  ProvideFavoritesRestaurants(idUser: string): Promise<string[]>;
}
