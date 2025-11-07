import { Result } from 'src/common/result/Result';
import { CreateOrderDto } from 'src/orders/Application/dto/input/create-order.dto';
import { OrderFullViewDto } from 'src/orders/Application/dto/output/order-fullview-dto';
import { OrderPrewievDto } from 'src/orders/Application/dto/output/order-preview-dto';

export interface IUserOrderService {
  CreateOrder(userId: string, dto: CreateOrderDto): Promise<Result<boolean>>;

  seeOrderSumarry(idOrder: string): Promise<Result<OrderFullViewDto>>;

  GetUserOrdersPreview(
    userId: string,
  ): Promise<Result<OrderPrewievDto[] | null>>;
}

export const USER_ORDER_SERVICE = Symbol('IUserOrderService');
