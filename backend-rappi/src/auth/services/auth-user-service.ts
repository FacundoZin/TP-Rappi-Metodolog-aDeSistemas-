import { Injectable } from '@nestjs/common';
import { CreateUserTokenDto } from 'src/auth/dto/input/create-user-token';

Injectable();
export class AuthUserService {
  async generateJwt(CreateUserTokenDto: CreateUserTokenDto): Promise<string> {}
}
