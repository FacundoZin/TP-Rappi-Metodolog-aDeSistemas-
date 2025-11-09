import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { VendorOnly } from 'src/auth/Decorators/decorators';
import { CreateRestaurantDto } from 'src/restaurants/Application/Dtos/Restaurant/Input/create-restaurant.dto';
import { UpdateRestaurantDto } from 'src/restaurants/Application/Dtos/Restaurant/Input/update-restaurant.dto';
import {
  type IRestaurantManager,
  RESTAURANT_MANAGER,
} from 'src/restaurants/domain/ServiceInterfaces/Managment/IRestaurantManager';

@VendorOnly()
@Controller('vendor/restaurant')
export class RestaurantManagerController {
  constructor(
    @Inject(RESTAURANT_MANAGER)
    private readonly restaurantManager: IRestaurantManager,
  ) {}

  @Post()
  @HttpCode(201)
  async createRestaurant(@Body() dto: CreateRestaurantDto) {
    const result = await this.restaurantManager.CreateRestaurant(dto);

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }

    return { id: result.data, message: 'Restaurante creado exitosamente' };
  }

  @Put(':Id')
  @HttpCode(200)
  async updateRestaurant(
    @Param('Id') restaurantId: string,
    @Body() dto: UpdateRestaurantDto,
  ) {
    const result = await this.restaurantManager.UpdateRestaurant(
      restaurantId,
      dto,
    );

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }

    return {
      message: `Restaurante ${restaurantId} actualizado. Filas afectadas: ${result.data}`,
    };
  }

  @Get(':Id')
  @HttpCode(200)
  async viewMyRestaurant(@Param('Id') restaurantId: string) {
    const result = await this.restaurantManager.viewMyRestaurant(restaurantId);

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }

    return result.data;
  }
}
