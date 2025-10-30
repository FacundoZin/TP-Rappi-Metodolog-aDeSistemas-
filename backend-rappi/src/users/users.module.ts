import { Module } from '@nestjs/common';
import { UsersService } from './Aplication/users.service';

@Module({
  providers: [UsersService],
})
export class UsersModule {}
