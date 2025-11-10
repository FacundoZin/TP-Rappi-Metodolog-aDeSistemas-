import { Injectable } from '@nestjs/common';
import { Result } from 'src/common/result/Result';
import { UserInfoForOrderDto } from 'src/usersAccount/Aplication/dto/user/provide-user-info.dto';
import { IUserProvider } from 'src/usersAccount/Domain/Ports/user-provider-interface';

@Injectable()
export class UserAdapter implements IUserProvider {
  ProvideContactInfo(
    idUser: string,
  ): Promise<Result<{ name: string; email: string }>> {
    throw new Error('Method not implemented.');
  }

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
