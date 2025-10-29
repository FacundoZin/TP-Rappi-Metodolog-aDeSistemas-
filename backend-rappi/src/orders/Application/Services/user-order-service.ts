import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/Domain/entities/order.entity';
import { Repository } from 'typeorm';
import { ProductAdapter } from 'src/restaurants/Infraestructure/Adapters/product-adapter';
import { RestaurantAdapter } from 'src/restaurants/Infraestructure/Adapters/restaurant-adapter';
import { VendorAdapter } from 'src/vendors/Infrastructure/vendor-adapter';

@Injectable()
export class UserOrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    private readonly productAdapter: ProductAdapter,
    private readonly restaurantAdapter: RestaurantAdapter,
    private readonly vendorAdapter: VendorAdapter,
  ) {}

  async CreateOrder(dto: CreateOrderDto): Promise<void> {
    this.restaurantAdapter.ProvideInfoToOrder(dto.restaurantId);
    this.productAdapter.ProvideInfoToOrderItem(dto.productIds);
    this.vendorAdapter.ProvideVendorEmail(dto.restaurantId);
  }
}
