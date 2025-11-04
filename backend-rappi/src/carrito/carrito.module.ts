import { Module } from '@nestjs/common';
import { UserCartService } from './Application/Services/cart-user-service';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './Domain/entities/cart-item.entity';
import { Cart } from './Domain/entities/cart.entity';

@Module({
  imports: [RestaurantsModule, TypeOrmModule.forFeature([Cart, CartItem])],
  providers: [UserCartService],
  exports: [UserCartService],
})
export class CarritoModule {}
