import { Result } from 'src/common/result/Result';
import { Order } from '../entities/order.entity';

export interface IOrderProvider {
  provideFullOder(orderId: string): Promise<Result<Order>>;
}

export const ORDER_ADAPTER = Symbol('IOrderProvider');
