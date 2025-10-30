import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductMapper } from '../Mappers/product-mapper';
import { Product } from 'src/restaurants/domain/entities/product.entity';
import { CreateProductDto } from '../dto/Prodcut/Input/create-product.dto';
import { ProductPrewievDto } from '../dto/Prodcut/Output/prewiev-product.dto';
import { UpdateProductDto } from '../dto/Prodcut/Input/update-product.dto';
import { Result } from 'src/common/result/Result';

@Injectable()
export class ProducVendorService {
  constructor(
    @InjectRepository(Product)
    private readonly ProductRepo: Repository<Product>,
  ) {}

  async CreateProduct(dto: CreateProductDto): Promise<Result<string>> {
    try {
      const product = await this.ProductRepo.save(
        ProductMapper.fromCreateDto(dto),
      );
      return Result.ok(product.id);
    } catch (error) {
      return Result.fail('No se pudo crear el producto: ' + error.message, 500);
    }
  }

  async GetProductById(Id: string): Promise<Result<Product>> {
    const product = await this.ProductRepo.findOne({ where: { id: Id } });
    if (!product) return Result.fail('Producto no encontrado', 404);
    return Result.ok(product);
  }

  async deleteProduct(id: string): Promise<Result<number>> {
    const result = await this.ProductRepo.delete(id);

    if (!result.affected || result.affected === 0)
      return Result.fail('Lo senitmos el producto no fue borrado', 404);

    return Result.ok(result.affected);
  }

  async ChangeProductStatus(
    Id: string,
    status: boolean,
  ): Promise<Result<Boolean>> {
    const product = await this.ProductRepo.findOne({ where: { id: Id } });
    if (!product)
      return Result.fail(
        'el producto que se esta intentando borrar no existe',
        404,
      );

    product.setAvailability(status);

    const savedProduct = await this.ProductRepo.save(product);

    if (!savedProduct) {
      return Result.fail(
        'Lo sentimos, no pudimos modificar el producto en la base de datos',
        500,
      );
    }

    return Result.ok(true);
  }

  async GetProductList(): Promise<Result<ProductPrewievDto[]>> {
    try {
      const products = await this.ProductRepo.find({
        order: { name: 'ASC' },
      });

      const productDtos = products.map((p) => new ProductPrewievDto(p));

      return Result.ok(productDtos);
    } catch (error) {
      return Result.fail(
        'Ocurrió un error al obtener la lista de productos: ' + error.message,
        500,
      );
    }
  }

  async updateProduct(
    Id: string,
    dto: UpdateProductDto,
  ): Promise<Result<number>> {
    const product = await this.ProductRepo.findOne({ where: { id: Id } });

    if (!product) return Result.fail('Producto no encontrado', 404);

    const updatedEntity = ProductMapper.fromUpdateProductDto(dto, product);
    const responseDB = await this.ProductRepo.update(Id, updatedEntity);

    if (!responseDB.affected || responseDB.affected === 0)
      return Result.fail(
        'Lo sentimos, no pudimoscarar el producto en la base de datos',
        404,
      );

    return Result.ok(responseDB.affected);
  }
}
