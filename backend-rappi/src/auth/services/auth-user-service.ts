import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserTokenDto } from 'src/auth/dto/input/create-user-token';

Injectable();
export class AuthUserService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwt(Dto: CreateUserTokenDto): Promise<string> {
    const payload = {
      sub: Dto.userId,
      email: Dto.email,
      role: Dto.role,
      username: Dto.username,
    };

    // firmamos el token
    const token = await this.jwtService.signAsync(payload);
    return token;
  }
}
