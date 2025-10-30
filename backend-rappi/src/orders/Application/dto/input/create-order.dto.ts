import { PaymentMethod } from 'src/orders/Domain/entities/order.entity';
import { CreateOrderItemsDto } from './create-orderItem.dto';

export class CreateOrderDto {
  userId: string;
  userName: string;
  userEmail: string;
  userAddress: string;
  restaurantId: string;
  orderItems: CreateOrderItemsDto[];
  metodoPago: PaymentMethod;
}
