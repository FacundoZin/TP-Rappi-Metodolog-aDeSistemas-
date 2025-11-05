import { Injectable } from '@nestjs/common';
import { RestaurantQueries } from 'src/restaurants/Infraestructure/Queries/Restaurant.Queries';
import { SearchRestaurantQueryObject } from '../dto/QueryObjects/SearchRestaurantsQueryObject';
import { RestaurantPreviewDto } from '../dto/Restaurant/Output/preview-restuarant.dto';
import { RestaurantViewDto } from '../dto/Restaurant/Output/view-restaurant.dto';
import { ProductPrewievDto } from '../dto/Prodcut/Output/prewiev-product.dto';
import { Result } from 'src/common/result/Result';
import { IRestaurantUserService } from 'src/restaurants/domain/ServiceInterfaces/IRestaurantUserService';

@Injectable()
export class RestaurantUserService implements IRestaurantUserService {
  constructor(private readonly QueryBuilder: RestaurantQueries) {}

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

    if (!restaurante) {
      return Result.fail('Restaurante no encontrado', 404);
    }

    const dto: RestaurantViewDto = {
      id: restaurante.id,
      name: restaurante.name,
      description: restaurante.description,
      category: restaurante.category,
      address: restaurante.address,
      products: restaurante.products.map((p) => new ProductPrewievDto(p)),
    };

    return Result.ok(dto);
  }
}
