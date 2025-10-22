import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, IsBoolean, IsUUID } from 'class-validator';
import { Product } from 'src/restaurants/entities/product.entity';

export class UpdateProductDto {
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
  @IsNotEmpty()
  isAvailable: boolean;


  toEntity(existingProduct?: Product): Product {
    const product = existingProduct ?? new Product();

    product.name = this.name;
    product.description = this.description;
    product.price = this.price;
    product.isAvailable = this.isAvailable;

    return product;
  }
}
