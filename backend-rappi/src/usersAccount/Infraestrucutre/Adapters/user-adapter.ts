import { Injectable } from '@nestjs/common';
import { Result } from 'src/common/result/Result';
import { UserInfoForOrderDto } from 'src/usersAccount/Aplication/dto/user/provide-user-info.dto';
import { IUserProviderInterface } from 'src/usersAccount/Domain/Ports/user-provider-interface';

@Injectable()
export class UserAdapter implements IUserProviderInterface {
  ProvideFavoritesRestaurants(idUser: string): Promise<string[]> {
    throw new Error('Method not implemented.');
  }

  ProvideUserInfoForOrder(
    idUser: string,
    idAddres: string,
  ): Promise<Result<UserInfoForOrderDto>> {
    throw new Error('Method not implemented.');
  }
}
