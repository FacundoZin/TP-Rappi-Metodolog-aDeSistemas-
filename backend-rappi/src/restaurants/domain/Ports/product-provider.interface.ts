import { ProductCartInfoDto } from 'src/restaurants/Application/dto/Prodcut/Output/product-cart-info.dto';
import { ProductOrderInfoDto } from 'src/restaurants/Application/dto/Prodcut/Output/produt-order-info.dto';

export interface IProductProvider {
  ProvideInfoToCart(IdProduct: string): Promise<ProductCartInfoDto | null>;
  ProvideInfoToOrderItem(
    IdProducts: string[],
  ): Promise<ProductOrderInfoDto[] | null>;
}
