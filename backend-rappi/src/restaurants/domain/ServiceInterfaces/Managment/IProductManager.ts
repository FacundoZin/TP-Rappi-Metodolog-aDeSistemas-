import { Result } from 'src/common/result/Result';
import { CreateProductDto } from 'src/restaurants/Application/Dtos/Prodcut/Input/create-product.dto';
import { ProductPrewievDto } from 'src/restaurants/Application/Dtos/Prodcut/Output/prewiev-product.dto';
import { UpdateProductDto } from 'src/restaurants/Application/Dtos/Prodcut/Input/update-product.dto';
import { Product } from '../../entities/product.entity';

export interface IProductManager {
  CreateProduct(dto: CreateProductDto): Promise<Result<string>>;
  GetProductById(Id: string): Promise<Result<Product>>;
  deleteProduct(id: string): Promise<Result<number>>;
  ChangeProductStatus(Id: string, status: boolean): Promise<Result<boolean>>;
  GetProductList(): Promise<Result<ProductPrewievDto[]>>;
  updateProduct(Id: string, dto: UpdateProductDto): Promise<Result<number>>;
}

// Symbol para inyección
export const PRODUCT_MANAGER = Symbol('IProductManager');
