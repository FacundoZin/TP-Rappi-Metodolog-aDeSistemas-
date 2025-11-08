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

@Module({
  imports: [TypeOrmModule.forFeature([User, UserAddress])],
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
    UserAdapter,
  ],
  exports: [USERS_ACCOUNT_SERVICE, USERS_ADDRESS_SERVICE, UserAdapter],
})
export class UsersAccountModule {}
