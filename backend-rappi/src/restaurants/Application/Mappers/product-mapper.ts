import { Product } from 'src/restaurants/domain/entities/product.entity';
import { CreateProductDto } from '../dto/Prodcut/Input/create-product.dto';
import { UpdateProductDto } from '../dto/Prodcut/Input/update-product.dto';
import { Restaurant } from 'src/restaurants/domain/entities/restaurant.entity';
import { ProductCartInfoDto } from '../dto/Prodcut/Output/product-cart-info.dto';
import { ProductOrderInfoDto } from '../dto/Prodcut/Output/produt-order-info.dto';

export class ProductMapper {
  static fromCreateDto(dto: CreateProductDto): Product {
    const product = new Product();

    product.name = dto.name.trim();
    product.description = dto.description.trim();
    product.price = dto.price;
    product.isAvailable = dto.isAvailable ?? true; // por defecto true
    product.restaurant = { id: dto.restaurantId } as Restaurant;

    return product;
  }

  static fromUpdateProductDto(
    dto: UpdateProductDto,
    productExisting: Product,
  ): Product {
    const product = productExisting;

    product.name = dto.name;
    product.description = dto.description;
    product.price = dto.price;
    product.isAvailable = dto.isAvailable;

    return product;
  }

  static toProductCartInfo(product: Product): ProductCartInfoDto {
    return {
      name: product.name,
      price: product.price,
    };
  }

  static toProductOrderInfo(product: Product): ProductOrderInfoDto {
    return {
      name: product.name,
      price: product.price,
    };
  }
}
