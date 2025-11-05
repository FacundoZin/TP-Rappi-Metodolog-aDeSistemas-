import { Injectable } from '@nestjs/common';
import { CreateVendorTokenDto } from '../dto/input/create-vendor-token.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthVendorService {
  constructor(private readonly jwtService: JwtService) {}
  async generateJwt(Dto: CreateVendorTokenDto): Promise<string> {
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
