import { Injectable } from '@nestjs/common';
import { CreateVendorDto } from '../dto/create-vendor.dto';
import { Result } from 'src/common/result/Result';
import { GoogleAuthAdapter } from 'src/auth/Adapter/auth-adapter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthVendorService } from 'src/auth/services/auth-vendor-service';
import { UserRole } from 'src/common/enum/user-role';
import { CreateVendorTokenDto } from 'src/auth/dto/input/create-vendor-token.dto';
import { LogingVendorDto } from '../dto/login-vendor.dto';
import { IVendorAccountService } from 'src/vendorsAccount/Domain/serviceInterface/IVendorAccountService';
import { UserVendor } from 'src/vendorsAccount/Domain/entities/vendor.entity';

@Injectable()
export class VendorAccountService implements IVendorAccountService {
  constructor(
    private readonly authService: AuthVendorService,
    private readonly authAdapter: GoogleAuthAdapter,
    @InjectRepository(UserVendor)
    private readonly vendorRepository: Repository<UserVendor>,
  ) {}
  async VendorRegister(
    createVendorDto: CreateVendorDto,
  ): Promise<Result<string>> {
    let googleData;
    try {
      googleData = await this.authAdapter.verifyGoogleToken(
        createVendorDto.googleToken,
      );
    } catch (err) {
      return Result.fail('Token de Google inválido', 401);
    }

    const existingUser = await this.vendorRepository.findOne({
      where: { googleId: googleData.googleId },
    });

    if (existingUser) {
      return Result.fail('El usuario vendedor ya está registrado', 409);
    }

    const newUser = this.vendorRepository.create({
      googleId: googleData.googleId!,
      email: googleData.email!,
      name: googleData.name!,
    });
    await this.vendorRepository.save(newUser);

    const createTokenDto = new CreateVendorTokenDto(
      newUser.id,
      UserRole.VENDOR,
      googleData.name!,
      googleData.email,
    );

    const jwt = await this.authService.generateJwt(createTokenDto);

    return Result.ok(jwt);
  }

  async VendorLogin(dto: LogingVendorDto): Promise<Result<string>> {
    let googleData;
    try {
      googleData = await this.authAdapter.verifyGoogleToken(dto.googleToken);
    } catch (err) {
      return Result.fail('Token de Google inválido', 401);
    }

    const existingUser = await this.vendorRepository.findOne({
      where: { googleId: googleData.googleId },
    });

    if (!existingUser) {
      return Result.fail('Usuario no registrado', 404);
    }

    const createTokenDto = new CreateVendorTokenDto(
      existingUser.id,
      UserRole.VENDOR,
      googleData.name!,
      googleData.email!,
    );

    const jwt = await this.authService.generateJwt(createTokenDto);

    return Result.ok(jwt);
  }
}
