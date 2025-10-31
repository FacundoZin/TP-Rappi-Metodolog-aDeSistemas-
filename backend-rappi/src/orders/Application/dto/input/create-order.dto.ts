import { PaymentMethod } from 'src/orders/Domain/valueobjects/PaymentMethod';
import { CreateOrderItemsDto } from './create-orderItem.dto';

export class CreateOrderDto {
  userId: string;
  addresId: string;
  restaurantId: string;
  orderItems: CreateOrderItemsDto[];
  metodoPago: PaymentMethod;
}
