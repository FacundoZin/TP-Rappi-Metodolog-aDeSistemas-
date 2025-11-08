import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpException,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';
import { CreateRestaurantAddressDto } from 'src/restaurants/Application/Dtos/Addres/Input/create.restaurantAddress.dto';
import { UpdateRestaurantAddressDto } from 'src/restaurants/Application/Dtos/Addres/Input/update-restaurantAddress.dto';
import {
  type IRestaurantAddressManager,
  RESTAURANT_ADDRESS_MANAGER,
} from 'src/restaurants/domain/ServiceInterfaces/IRestaurantAddresManager';

@Controller('vendor/restaurant/addres')
@UseGuards(JwtAuthGuard)
export class restaurantAddressManagerController {
  constructor(
    @Inject(RESTAURANT_ADDRESS_MANAGER)
    private readonly restaurantAddressManager: IRestaurantAddressManager,
  ) {}

  @Post()
  @HttpCode(201)
  async createAddress(@Body() dto: CreateRestaurantAddressDto) {
    const result = await this.restaurantAddressManager.createAddress(dto);

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }

    return { id: result.data, message: 'Dirección creada exitosamente' };
  }

  @Put(':idAddres')
  @HttpCode(200)
  async updateAddress(
    @Param('idAddres') idAddres: string,
    @Body() dto: UpdateRestaurantAddressDto,
  ) {
    const result = await this.restaurantAddressManager.updateAddress(
      idAddres,
      dto,
    );

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }

    return {
      message: `Dirección ${idAddres} actualizada.`,
    };
  }

  @Delete(':idAddres')
  @HttpCode(204)
  async deleteAddress(@Param('idAddres') idAddres: string) {
    const result = await this.restaurantAddressManager.deleteAddress(idAddres);

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }
  }
}
