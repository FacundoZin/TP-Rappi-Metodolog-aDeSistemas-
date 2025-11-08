import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';
import { CreateRestaurantDto } from 'src/restaurants/Application/Dtos/Restaurant/Input/create-restaurant.dto';
import { UpdateRestaurantDto } from 'src/restaurants/Application/Dtos/Restaurant/Input/update-restaurant.dto';
import {
  type IRestaurantManager,
  RESTAURANT_MANAGER,
} from 'src/restaurants/domain/ServiceInterfaces/IRestaurantManager';

@Controller('vendor/restaurant')
@UseGuards(JwtAuthGuard)
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
}
