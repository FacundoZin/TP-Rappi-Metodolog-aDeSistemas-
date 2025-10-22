import { Injectable } from '@nestjs/common';
import { SearchRestaurantQueryObject } from './dto/QueryObjects/SearchRestaurantsQueryObject';
import { Result } from './Common/Result';
import { RestaurantQueries } from './Queries/Restaurant.Queries';
import { RestaurantPreviewDto } from './dto/Restaurant/Output/preview-restuarant.dto';
import { RestaurantViewDto } from './dto/Restaurant/Output/view-restaurant.dto';
import { ProductPrewievDto } from './dto/Prodcut/Output/prewiev-product.dto';


@Injectable()
export class RestaurantUserService {
  constructor(
    private readonly QueryBuilder: RestaurantQueries, 
  ){}


  async searchRestaurants(filters: SearchRestaurantQueryObject): Promise<Result<RestaurantPreviewDto[]>> {

    const definedFilters = Object.values(filters).filter(v => v !== undefined && v !== null);
    if (definedFilters.length !== 1) {
      return Result.fail("Por favor, especifique exactamente uno de los siguientes filtros: 'filtroA', 'filtroB'.", 400) 
    }

    const restaurantes = await this.QueryBuilder.findByFilters(filters)

    return Result.ok(restaurantes.map(r => new RestaurantPreviewDto({
      id: r.id,
      name: r.name,
      description: r.description
    })));
  }

  async GetRestaurantById(Id: string): Promise<Result<RestaurantViewDto>>{

    const restaurante = await this.QueryBuilder.findByIdWithRelations(Id)

    if(!restaurante){
      return Result.fail("Restaurante no encontrado", 404)
    }

    const dto: RestaurantViewDto = {
      id: restaurante.id,
      name: restaurante.name,
      description: restaurante.description,
      category: restaurante.category,
      street: restaurante.address.street,
      main: restaurante.address.main,
      city: restaurante.address.city,
      province: restaurante.address.province,
      country: restaurante.address.country,
      products: restaurante.products.map(p => new ProductPrewievDto(p)),
    };
    
    return Result.ok(dto);
  }


}
