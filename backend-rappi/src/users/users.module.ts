import { Module } from '@nestjs/common';
import { UserAdapter } from './Infraestrucutre/Adapters/user-adapter';
import { UsersAccountService } from './Aplication/Services/account-user-service';
import { UsersAddresService } from './Aplication/Services/address-user-services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Domain/entities/user.entity';
import { UserAddress } from './Domain/entities/user-address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserAddress])],
  providers: [UsersAccountService, UsersAddresService, UserAdapter],
  exports: [UsersAccountService, UsersAddresService, UserAdapter],
})
export class UsersModule {}
