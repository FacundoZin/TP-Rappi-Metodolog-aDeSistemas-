import { OrderStatus } from 'src/orders/Domain/valueobjects/OrderStatus';

export class OrderPrewievDto {
  id: string;
  status: OrderStatus;
  restaurantName: string;
  createdAt: Date;
  totalAmount: number;
}
