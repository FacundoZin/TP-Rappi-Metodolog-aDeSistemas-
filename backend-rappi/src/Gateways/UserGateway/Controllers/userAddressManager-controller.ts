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
import { CreateUserAddressDto } from 'src/usersAccount/Aplication/dto/addres/create-address.dto';
import {
  type IUsersAddressService,
  USERS_ADDRESS_SERVICE,
} from 'src/usersAccount/Domain/serviceInterfaces/IUser-addres-service';

@Controller('userAddres')
@UseGuards(JwtAuthGuard)
export class UserAddresManagerController {
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
