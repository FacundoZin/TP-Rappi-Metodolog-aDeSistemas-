import { Module } from '@nestjs/common';
import { UserAdapter } from './Infraestrucutre/Adapters/user-adapter';
import { UsersService } from './Aplication/Services/users.service';

@Module({
  providers: [UsersService, UserAdapter],
  exports: [UsersService, UserAdapter],
})
export class UsersModule {}
