import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCartInfoDto } from 'src/restaurants/Application/Dtos/Prodcut/Output/product-cart-info.dto';
import { ProductOrderInfoDto } from 'src/restaurants/Application/Dtos/Prodcut/Output/produt-order-info.dto';
import { ProductMapper } from 'src/restaurants/Application/Mappers/product-mapper';
import { Product } from 'src/restaurants/domain/entities/product.entity';
import { IProductProvider } from 'src/restaurants/domain/Ports/product-provider.interface';
import { In, Repository } from 'typeorm';

@Injectable()
export class ProductAdapter implements IProductProvider {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async ProvideInfoToOrderItem(
    IdProducts: string[],
  ): Promise<ProductOrderInfoDto[]> {
    const products = await this.productRepo.find({
      where: { id: In(IdProducts) },
    });

    if (!products || products.length === 0) {
      return [];
    }

    return products.map((product) => ProductMapper.toProductOrderInfo(product));
  }

  async ProvideInfoToCart(
    IdProduct: string,
  ): Promise<ProductCartInfoDto | null> {
    const product = await this.productRepo.findOne({
      where: { id: IdProduct },
    });

    if (!product || !product.restaurant) {
      return null;
    }

    return ProductMapper.toProductCartInfo(product);
  }
}
