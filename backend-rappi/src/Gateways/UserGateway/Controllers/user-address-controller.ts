import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpException,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';
import type { RequestWithUser } from 'src/common/HttpRequestWithUser/IRequestWithUser';
import { CreateUserAddressDto } from 'src/users/Aplication/dto/addres/create-address.dto';
import {
  USERS_ADDRESS_SERVICE,
  type IUsersAddressService,
} from 'src/users/Domain/serviceInterfaces/IUser-addres-service';

@Controller('user/addres')
@UseGuards(JwtAuthGuard)
export class UserAddresController {
  constructor(
    @Inject(USERS_ADDRESS_SERVICE)
    private readonly userAddressService: IUsersAddressService,
  ) {}

  @Post()
  @HttpCode(201)
  async AddNewAddress(
    @Req() req: RequestWithUser,
    @Body() dto: CreateUserAddressDto,
  ) {
    const user = req.user;

    const result = await this.userAddressService.createAddress(user.sub, dto);

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }

    return result.data;
  }

  @Delete()
  @HttpCode(204)
  async DeleteAddres(
    @Req() req: RequestWithUser,
    @Param('addressId') addressId: string,
  ) {
    const user = req.user;

    const result = await this.userAddressService.dropAddress(
      user.sub,
      addressId,
    );

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }
  }
}
