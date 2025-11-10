import { Result } from 'src/common/result/Result';
import { Order } from 'src/orders/Domain/entities/order.entity';
import { IOrderProvider } from 'src/orders/Domain/ports/IOrderProvider';

export class orderAdapter implements IOrderProvider {
  provideFullOder(orderId: string): Promise<Result<Order>> {
    throw new Error('Method not implemented.');
  }
}
