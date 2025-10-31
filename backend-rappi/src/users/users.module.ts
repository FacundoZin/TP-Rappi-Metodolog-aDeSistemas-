import { Module } from '@nestjs/common';
import { UsersService } from './Aplication/users.service';
import { UserAdapter } from './Infraestrucutre/Adapters/user-adapter';

@Module({
  providers: [UsersService, UserAdapter],
  exports: [UsersService, UserAdapter],
})
export class UsersModule {}
