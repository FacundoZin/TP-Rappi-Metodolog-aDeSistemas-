import { ProductPrewievDto } from '../../Prodcut/Output/prewiev-product.dto';
import { RestaurantAddressPreviewDto } from '../../Addres/Output/restaurant-addres-preview.dto';
import { RestaurantCategory } from 'src/restaurants/domain/entities/restaurant.entity';

export class RestaurantViewDto {
  id: string;
  name: string;
  description: string;
  category: RestaurantCategory;
  address: RestaurantAddressPreviewDto;

  products: ProductPrewievDto[];

  constructor(partial: Partial<RestaurantViewDto>) {
    Object.assign(this, partial);
  }
}
