import { Injectable } from '@nestjs/common';
import { CreateUserTokenDto } from 'src/users/Aplication/dto/token/create-user-token';

Injectable();
export class AuthUserService {
  async generateJwt(CreateUserTokenDto: CreateUserTokenDto): Promise<string> {}
}
