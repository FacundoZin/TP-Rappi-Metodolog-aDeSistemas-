import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestaurantOrderInfoDto } from 'src/restaurants/Application/Dtos/Restaurant/Output/order-info-restaurant.dto';
import { RestaurantBackofficeViewDto } from 'src/restaurants/Application/Dtos/Restaurant/Output/restaurant-Backoffice-view.dto';
import { RestaurantMapper } from 'src/restaurants/Application/Mappers/restaurant-mapper';
import { Restaurant } from 'src/restaurants/domain/entities/restaurant.entity';
import { IRestaurantProvider } from 'src/restaurants/domain/Ports/restaurant-provider.interface';
import { Repository } from 'typeorm';

@Injectable()
export class RestaurantAdapter implements IRestaurantProvider {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepo: Repository<Restaurant>,
  ) {}
  ProvideRestaurantsPendings(): Promise<RestaurantBackofficeViewDto> {
    throw new Error('Method not implemented.');
  }

  async ProvideInfoToOrder(
    IdRestaurante: string,
  ): Promise<RestaurantOrderInfoDto | null> {
    const restaurant = await this.restaurantRepo.findOne({
      where: { id: IdRestaurante },
      relations: ['address'],
    });

    if (!restaurant) return null;

    return RestaurantMapper.ToOrderInfo(restaurant);
  }
}
