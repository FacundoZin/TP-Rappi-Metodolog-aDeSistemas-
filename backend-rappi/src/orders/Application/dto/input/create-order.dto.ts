import { PaymentMethod } from 'src/orders/Domain/valueobjects/PaymentMethod';
import { CreateOrderItemsDto } from './create-orderItem.dto';

export class CreateOrderDto {
  addresId: string;
  restaurantId: string;
  orderItems: CreateOrderItemsDto[];
  metodoPago: PaymentMethod;
}
