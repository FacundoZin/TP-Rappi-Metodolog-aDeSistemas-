import { Repository } from 'typeorm';
import { SearchRestaurantQueryObject } from '../../Application/Dtos/QueryObjects/SearchRestaurantsQueryObject';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from 'src/restaurants/domain/entities/restaurant.entity';

@Injectable()
export class RestaurantQueries {
  constructor(
    @InjectRepository(Restaurant)
    private readonly repo: Repository<Restaurant>,
  ) {}

  async findByIdWithRelations(id: string): Promise<Restaurant | null> {
    return await this.repo
      .createQueryBuilder('restaurant')
      .leftJoinAndSelect('restaurant.address', 'address')
      .leftJoinAndSelect(
        'restaurant.products',
        'product',
        'product.available = true',
      )
      .where('restaurant.id = :id', { id })
      .getOne();
  }

  async findByFilters(
    filters: SearchRestaurantQueryObject,
  ): Promise<Restaurant[]> {
    const qb = this.repo.createQueryBuilder('restaurant');

    const { name, category, city } = filters;

    if (name) {
      qb.andWhere('LOWER(restaurant.name) LIKE LOWER(:name)', {
        name: `%${name}%`,
      });
    }

    if (category) {
      qb.andWhere('restaurant.category = :category', { category });
    }

    if (city) {
      qb.innerJoin('restaurant.address', 'address').andWhere(
        'LOWER(address.city) = LOWER(:city)',
        {
          city: city.toLowerCase(),
        },
      );
    }

    // Si querés, podés incluir productos disponibles también:
    qb.leftJoinAndSelect(
      'restaurant.products',
      'product',
      'product.available = true',
    );

    qb.leftJoinAndSelect('restaurant.address', 'address');

    return await qb.getMany();
  }
}
