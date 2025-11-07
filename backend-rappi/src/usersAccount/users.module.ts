import { Module } from '@nestjs/common';
import { UserAdapter } from './Infraestrucutre/Adapters/user-adapter';
import { UsersAccountService } from './Aplication/Services/account-user-service';
import { UsersAddresService } from './Aplication/Services/address-user-services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Domain/entities/user.entity';
import { UserAddress } from './Domain/entities/user-address.entity';
import { USERS_ACCOUNT_SERVICE } from './Domain/serviceInterfaces/IUser-accout-service';
import { USERS_ADDRESS_SERVICE } from './Domain/serviceInterfaces/IUser-addres-service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserAddress])],
  providers: [
    {
      provide: USERS_ACCOUNT_SERVICE, // esto será lo que inyectás
      useClass: UsersAccountService, // implementación concreta
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
