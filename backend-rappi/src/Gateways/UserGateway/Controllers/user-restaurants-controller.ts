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
import { SearchRestaurantQueryObject } from 'src/restaurants/Application/dto/QueryObjects/SearchRestaurantsQueryObject';
import {
  type IRestaurantUserService,
  RESTAURANT_USER_SERVICE,
} from 'src/restaurants/domain/ServiceInterfaces/IRestaurantUserService';

@Controller('user/restaurants')
@UseGuards(JwtAuthGuard)
export class UserRestaurantsController {
  constructor(
    @Inject(RESTAURANT_USER_SERVICE)
    private readonly restaurantUserService: IRestaurantUserService,
  ) {}

  @Get()
  async searchRestaurant(@Query() filters: SearchRestaurantQueryObject) {
    const result = await this.restaurantUserService.searchRestaurants(filters);

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }

    return result.data;
  }

  @Get(':idRestaurant')
  async getRestaurantById(@Param('idRestaurant') id: string) {
    const result = await this.restaurantUserService.GetRestaurantById(id);

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }

    return result.data;
  }
}
