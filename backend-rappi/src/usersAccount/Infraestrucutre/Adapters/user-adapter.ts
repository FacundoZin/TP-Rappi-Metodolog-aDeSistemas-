import { Injectable } from '@nestjs/common';
import { Result } from 'src/common/result/Result';
import { UserInfoForOrderDto } from 'src/users/Aplication/dto/user/provide-user-info.dto';
import { IUserProviderInterface } from 'src/users/Domain/Ports/user-provider-interface';

@Injectable()
export class UserAdapter implements IUserProviderInterface {
  ProvideUserInfoForOrder(
    idUser: string,
    idAddres: string,
  ): Promise<Result<UserInfoForOrderDto>> {
    throw new Error('Method not implemented.');
  }
}
