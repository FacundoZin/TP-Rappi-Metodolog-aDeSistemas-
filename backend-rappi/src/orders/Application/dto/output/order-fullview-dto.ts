import { OrderStatus } from 'src/orders/Domain/valueobjects/OrderStatus';
import { PaymentMethod } from 'src/orders/Domain/valueobjects/PaymentMethod';
import { OrderItemViewDto } from './orderItem-view.dto';

export class OrderFullViewDto {
  id: string;
  orderDate: Date;
  status: OrderStatus;
  restaurantId: string;
  restaurantName: string;
  restaurantAddress: string;
  userId: string;
  userName: string;
  userAddress: string;
  userEmail: string;
  vendorEmail: string;
  metodoPago: PaymentMethod;
  totalAmount: number;
  items: OrderItemViewDto[];
}
