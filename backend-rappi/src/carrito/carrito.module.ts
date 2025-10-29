import { Module } from '@nestjs/common';
import { ProductAdapter } from 'src/restaurants/Infraestructure/Adapters/product-adapter';

@Module({
  imports: [ProductAdapter],
})
export class CarritoModule {}
