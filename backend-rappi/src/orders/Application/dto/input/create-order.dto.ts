import { PaymentMethod } from 'src/orders/Domain/valueobjects/PaymentMethod';
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
