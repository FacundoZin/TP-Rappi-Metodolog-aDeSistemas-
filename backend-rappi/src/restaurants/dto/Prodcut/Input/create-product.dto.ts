import { Product } from "src/restaurants/entities/product.entity";
import { Restaurant } from "src/restaurants/entities/restaurant.entity";
import { IsString, IsNotEmpty, IsNumber, Min, IsOptional, IsBoolean } from 'class-validator';

export class CreateProductDto{
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @IsString()
  @IsNotEmpty()
  restaurantId: string;

  // Método de extensión para convertir el DTO a entidad
  toEntity(): Product {
    const product = new Product();
    product.name = this.name;
    product.description = this.description;
    product.price = this.price;
    product.isAvailable = this.isAvailable ?? true;
    product.restaurant = { id: this.restaurantId} as Restaurant;
    return product;
  }
}