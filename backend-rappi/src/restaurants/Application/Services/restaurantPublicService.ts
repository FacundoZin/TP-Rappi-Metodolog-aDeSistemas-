import { Inject, Injectable } from '@nestjs/common';
import { RestaurantQueries } from 'src/restaurants/Infraestructure/Queries/Restaurant.Queries';
import { SearchRestaurantQueryObject } from '../Dtos/QueryObjects/SearchRestaurantsQueryObject';
import { RestaurantPreviewDto } from '../Dtos/Restaurant/Output/preview-restuarant.dto';
import { RestaurantViewDto } from '../Dtos/Restaurant/Output/view-restaurant.dto';
import { ProductPrewievDto } from '../Dtos/Prodcut/Output/prewiev-product.dto';
import { Result } from 'src/common/result/Result';
import { IRestaurantPublicService } from 'src/restaurants/domain/ServiceInterfaces/IRestaurantPublicService';
import {
  type IReviewService,
  REVIEW_SERVICE,
} from 'src/restaurants/domain/ServiceInterfaces/IReviewService';
import { ReviewDto } from '../Dtos/Reviews/Output/review.dto';

@Injectable()
export class RestaurantPublicService implements IRestaurantPublicService {
  constructor(
    private readonly QueryBuilder: RestaurantQueries,
    @Inject(REVIEW_SERVICE)
    private readonly reviewService: IReviewService,
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
}
