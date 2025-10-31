import { Injectable } from '@nestjs/common';
import { CreateUserTokenDto } from 'src/common/token/create-user-token';

Injectable();
export class AuthUserService {
  async generateJwt(CreateUserTokenDto: CreateUserTokenDto): Promise<string> {}
}
