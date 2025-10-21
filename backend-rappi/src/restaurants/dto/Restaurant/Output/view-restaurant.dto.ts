import { RestaurantCategory } from "src/restaurants/entities/restaurant.entity";
import { ProductPrewievDto } from "../../Prodcut/Output/prewiev-product.dto";

export class RestaurantViewDto {
  id: string;
  name: string;
  description: string;
  category: RestaurantCategory

  street: string;  
  main: string;  
  city: string;  
  province: string;
  country: string;

  products: ProductPrewievDto[]

  constructor(partial: Partial<RestaurantViewDto>) {
    Object.assign(this, partial);
  }
}
