import { Injectable } from '@nestjs/common';
import { GoogleAuthAdapter } from 'src/auth/Adapter/auth-adapter';
import { AuthUserService } from 'src/auth/services/auth-user-service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from 'src/common/enum/user-role';
import { Result } from 'src/common/result/Result';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { CreateUserTokenDto } from 'src/auth/dto/input/create-user-token';
import { IUsersAccountService } from 'src/usersAccount/Domain/serviceInterfaces/IUser-accout-service';
import { User } from 'src/usersAccount/Domain/entities/user.entity';

@Injectable()
export class UsersAccountService implements IUsersAccountService {
  constructor(
    private readonly authService: AuthUserService,
    private readonly authAdapter: GoogleAuthAdapter,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async UserRegister(createUserDto: CreateUserDto): Promise<Result<string>> {
    let googleData;
    try {
      googleData = await this.authAdapter.verifyGoogleToken(
        createUserDto.googleToken,
      );
    } catch (err) {
      return Result.fail('Token de Google inválido', 401);
    }

    const existingUser = await this.usersRepository.findOne({
      where: { googleId: googleData.googleId },
    });

    if (existingUser) {
      return Result.fail('El usuario ya está registrado', 409);
    }

    const newUser = this.usersRepository.create({
      googleId: googleData.googleId!,
      email: googleData.email!,
      name: googleData.name!,
      addresses: [createUserDto.createAddres],
    });
    await this.usersRepository.save(newUser);

    const createTokenDto = new CreateUserTokenDto(
      newUser.id,
      UserRole.CLIENT,
      googleData.name!,
      googleData.email,
    );

    const jwt = await this.authService.generateJwt(createTokenDto);

    return Result.ok(jwt);
  }

  async UserLogin(googleToken: string): Promise<Result<string>> {
    let googleData;
    try {
      googleData = await this.authAdapter.verifyGoogleToken(googleToken);
    } catch (err) {
      return Result.fail('Token de Google inválido', 401);
    }

    const existingUser = await this.usersRepository.findOne({
      where: { googleId: googleData.googleId },
    });

    if (!existingUser) {
      return Result.fail('Usuario no registrado', 404);
    }

    const createTokenDto = new CreateUserTokenDto(
      existingUser.id,
      UserRole.VENDOR,
      googleData.name!,
      googleData.email!,
    );

    const jwt = await this.authService.generateJwt(createTokenDto);

    return Result.ok(jwt);
  }
}
