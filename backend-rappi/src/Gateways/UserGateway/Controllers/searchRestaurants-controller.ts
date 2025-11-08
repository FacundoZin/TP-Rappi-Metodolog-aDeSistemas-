import {
  Controller,
  Get,
  HttpException,
  Inject,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';
import { SearchRestaurantQueryObject } from 'src/restaurants/Application/Dtos/QueryObjects/SearchRestaurantsQueryObject';
import {
  type IRestaurantPublicService,
  RESTAURANT_PUBLIC_SERVICE,
} from 'src/restaurants/domain/ServiceInterfaces/IRestaurantPublicService';

@Controller('user/restaurants')
@UseGuards(JwtAuthGuard)
export class searchRestaurantsController {
  constructor(
    @Inject(RESTAURANT_PUBLIC_SERVICE)
    private readonly restaurantPublicService: IRestaurantPublicService,
  ) {}

  @Get()
  async searchRestaurant(@Query() filters: SearchRestaurantQueryObject) {
    const result =
      await this.restaurantPublicService.searchRestaurants(filters);

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }

    return result.data;
  }

  @Get(':idRestaurant')
  async getRestaurantById(@Param('idRestaurant') id: string) {
    const result = await this.restaurantPublicService.GetRestaurantById(id);

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }

    return result.data;
  }

  @Get('favorites')
  async getFavoriteRestaurants(@Query('ids') ids: string) {
    const idsArray = ids ? ids.split(',') : [];

    if (!idsArray.length) {
      throw new HttpException(
        'Debes proporcionar al menos un ID de restaurante favorito',
        400,
      );
    }

    const result =
      await this.restaurantPublicService.getFavoritesRestaurants(idsArray);

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }

    return result.data;
  }
}
