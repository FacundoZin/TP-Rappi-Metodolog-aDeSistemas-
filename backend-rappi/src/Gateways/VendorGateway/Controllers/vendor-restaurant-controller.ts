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
import { CreateRestaurantDto } from 'src/restaurants/Application/dto/Restaurant/Input/create-restaurant.dto';
import { UpdateRestaurantDto } from 'src/restaurants/Application/dto/Restaurant/Input/update-restaurant.dto';
import {
  type IRestaurantVendorService,
  RESTAURANT_VENDOR_SERVICE,
} from 'src/restaurants/domain/ServiceInterfaces/IRestaurantVendorService';

@Controller('vendor/restaurant')
@UseGuards(JwtAuthGuard)
export class VendorRestaurantController {
  constructor(
    @Inject(RESTAURANT_VENDOR_SERVICE)
    private readonly restaurantVendorService: IRestaurantVendorService,
  ) {}

  @Post()
  @HttpCode(201)
  async createRestaurant(@Body() dto: CreateRestaurantDto) {
    const result = await this.restaurantVendorService.CreateRestaurant(dto);

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
    const result = await this.restaurantVendorService.UpdateRestaurant(
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
