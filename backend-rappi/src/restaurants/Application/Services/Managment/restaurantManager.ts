import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from 'src/restaurants/domain/entities/restaurant.entity';
import { RestaurantAddress } from 'src/restaurants/domain/entities/restaurant-addres.entity';

import { Injectable } from '@nestjs/common';
import { Result } from 'src/common/result/Result';
import { IRestaurantManager } from 'src/restaurants/domain/ServiceInterfaces/Managment/IRestaurantManager';
import { CreateRestaurantDto } from '../../Dtos/Restaurant/Input/create-restaurant.dto';
import { UpdateRestaurantDto } from '../../Dtos/Restaurant/Input/update-restaurant.dto';
import { RestaurantInfoDto } from '../../Dtos/Restaurant/Output/restaurant-info.dto';
import { RestaurantMapper } from '../../Mappers/restaurant-mapper';

@Injectable()
export class RestaurantManager implements IRestaurantManager {
  constructor(
    @InjectRepository(Restaurant)
    private readonly _RestaurantRepo: Repository<Restaurant>,
    @InjectRepository(RestaurantAddress)
    private readonly _AddresRepo: Repository<RestaurantAddress>,
  ) {}

  async CreateRestaurant(dto: CreateRestaurantDto): Promise<Result<string>> {
    const addres = await this._AddresRepo.findOne({
      where: { id: dto.addressId },
    });
    if (!addres) {
      return Result.fail(
        'lo sentimos, no se encontro la direccion asociada',
        404,
      );
    }

    const restaurantCreated = await this._RestaurantRepo.save(
      dto.toEntity(addres),
    );

    return Result.ok(restaurantCreated.id);
  }

  async UpdateRestaurant(
    Id: string,
    dto: UpdateRestaurantDto,
  ): Promise<Result<number>> {
    const Restaurant = await this._RestaurantRepo.findOne({
      where: { id: Id },
    });

    if (!Restaurant)
      return Result.fail(
        'el restaurante que quiere actualizar no fue encontrado',
        404,
      );

    const responseDB = await this._RestaurantRepo.update(
      Id,
      dto.toEntity(Restaurant),
    );

    if (!responseDB.affected || responseDB.affected === 0)
      return Result.fail(
        'Lo sentimos, no pudimos modificar el producto en la base de datos',
        404,
      );

    return Result.ok(responseDB.affected);
  }

  async viewMyRestaurant(
    idRestaurant: string,
  ): Promise<Result<RestaurantInfoDto>> {
    const restaurant = await this._RestaurantRepo.findOne({
      where: { id: idRestaurant },
      relations: ['address'],
    });

    if (!restaurant) {
      return Result.fail('Restaurante no encontrado', 404);
    }

    return Result.ok(RestaurantMapper.ToRestaurantInfo(restaurant));
  }
}
