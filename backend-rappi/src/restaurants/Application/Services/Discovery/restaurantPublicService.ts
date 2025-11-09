import { Inject, Injectable } from '@nestjs/common';
import { RestaurantQueries } from 'src/restaurants/Infraestructure/Queries/Restaurant.Queries';

import { Result } from 'src/common/result/Result';
import { IRestaurantPublicService } from 'src/restaurants/domain/ServiceInterfaces/Discovery/IRestaurantPublicService';
import {
  type IReviewService,
  REVIEW_SERVICE,
} from 'src/restaurants/domain/ServiceInterfaces/Discovery/IReviewService';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from 'src/restaurants/domain/entities/restaurant.entity';
import { In, Repository } from 'typeorm';
import { SearchRestaurantQueryObject } from '../../Dtos/QueryObjects/SearchRestaurantsQueryObject';
import { RestaurantPreviewDto } from '../../Dtos/Restaurant/Output/preview-restuarant.dto';
import { RestaurantViewDto } from '../../Dtos/Restaurant/Output/view-restaurant.dto';
import { ProductPrewievDto } from '../../Dtos/Prodcut/Output/prewiev-product.dto';
import { ReviewDto } from '../../../../common/Dtos/review.dto';

@Injectable()
export class RestaurantPublicService implements IRestaurantPublicService {
  constructor(
    private readonly QueryBuilder: RestaurantQueries,
    @Inject(REVIEW_SERVICE)
    private readonly reviewService: IReviewService,
    @InjectRepository(Restaurant)
    private readonly restaurantRepo: Repository<Restaurant>,
  ) {}

  async searchRestaurants(
    filters: SearchRestaurantQueryObject,
  ): Promise<Result<RestaurantPreviewDto[]>> {
    if (filters.hasExactlyOneFilter()) {
      return Result.fail(
        "Por favor, especifique exactamente uno de los siguientes filtros: 'Nombre', 'Categoria', 'Ciudad'.",
        400,
      );
    }

    const restaurantes = await this.QueryBuilder.findByFilters(filters);

    return Result.ok(
      restaurantes.map(
        (r) =>
          new RestaurantPreviewDto({
            id: r.id,
            name: r.name,
            description: r.description,
          }),
      ),
    );
  }

  async GetRestaurantById(Id: string): Promise<Result<RestaurantViewDto>> {
    const restaurante = await this.QueryBuilder.findByIdWithRelations(Id);
    const reviewSummary = await this.reviewService.getAverageStars(Id);

    if (!restaurante) {
      return Result.fail('Restaurante no encontrado', 404);
    }

    if (!reviewSummary.success) {
      //se podria loguear que esta depeendencia esta fallando
      console.log(
        'el servicio de reviews que calcula las estrellas promedio por restaurante no esta funcionando',
      );
    }

    const dto: RestaurantViewDto = {
      id: restaurante.id,
      name: restaurante.name,
      description: restaurante.description,
      category: restaurante.category,
      address: restaurante.address,
      reviewSummary: reviewSummary.data ? reviewSummary.data : undefined,
      products: restaurante.products.map((p) => new ProductPrewievDto(p)),
    };

    return Result.ok(dto);
  }

  async getRestaurantsReviews(
    idRestaurant: string,
  ): Promise<Result<ReviewDto[]>> {
    const reviews =
      await this.reviewService.getReviewsByRestaurant(idRestaurant);

    return Result.ok(reviews.data ? reviews.data : []);
  }

  async getFavoritesRestaurants(
    idsFavoritos: string[],
  ): Promise<Result<RestaurantPreviewDto[]>> {
    try {
      const restaurants = await this.restaurantRepo.find({
        where: { id: In(idsFavoritos) },
      });

      if (!restaurants.length) {
        return Result.fail('No se encontraron restaurantes favoritos', 404);
      }

      const previewDto = restaurants.map(
        (r) =>
          new RestaurantPreviewDto({
            id: r.id,
            name: r.name,
            description: r.description,
          }),
      );

      return Result.ok(previewDto);
    } catch (error) {
      console.error(error);
      return Result.fail('Error al obtener los restaurantes favoritos', 500);
    }
  }
}
