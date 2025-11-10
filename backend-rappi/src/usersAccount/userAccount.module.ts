import { Module } from '@nestjs/common';
import { UserAdapter } from './Infraestrucutre/Adapters/user-adapter';
import { UsersAccountService } from './Aplication/Services/account-user-service';
import { UsersAddresService } from './Aplication/Services/address-user-services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Domain/entities/user.entity';
import { UserAddress } from './Domain/entities/user-address.entity';
import { USERS_ACCOUNT_SERVICE } from './Domain/serviceInterfaces/IUser-accout-service';
import { USERS_ADDRESS_SERVICE } from './Domain/serviceInterfaces/IUser-addres-service';
import { USERS_FAVORITES_SERVICE } from './Domain/serviceInterfaces/IUser-favorite-service';
import { UserFavoriteService } from './Aplication/Services/favorites-user-service';
import { Favorites } from './Domain/entities/favortes.entity';
import { USER_PROVIDER } from './Domain/Ports/user-provider-interface';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserAddress, Favorites])],
  providers: [
    {
      provide: USERS_FAVORITES_SERVICE,
      useClass: UserFavoriteService,
    },
    {
      provide: USERS_ACCOUNT_SERVICE,
      useClass: UsersAccountService,
    },
    {
      provide: USERS_ADDRESS_SERVICE,
      useClass: UsersAddresService,
    },
    {
      provide: USER_PROVIDER,
      useClass: UserAdapter,
    },
  ],
  exports: [
    USERS_ACCOUNT_SERVICE,
    USERS_ADDRESS_SERVICE,
    USER_PROVIDER,
    USERS_FAVORITES_SERVICE,
  ],
})
export class UsersAccountModule {}
