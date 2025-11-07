import { ProductPrewievDto } from '../../Prodcut/Output/prewiev-product.dto';
import { RestaurantAddressPreviewDto } from '../../Addres/Output/restaurant-addres-preview.dto';
import { RestaurantCategory } from 'src/restaurants/domain/entities/restaurant.entity';
import { ReviewSummaryDto } from '../../Reviews/Output/review-summary.dto';

export class RestaurantViewDto {
  id: string;
  name: string;
  description: string;
  category: RestaurantCategory;
  address: RestaurantAddressPreviewDto;
  reviewSummary?: ReviewSummaryDto;
  products: ProductPrewievDto[];

  constructor(partial: Partial<RestaurantViewDto>) {
    Object.assign(this, partial);
  }
}
