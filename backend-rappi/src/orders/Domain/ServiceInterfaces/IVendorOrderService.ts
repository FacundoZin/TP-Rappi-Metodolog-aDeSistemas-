import { Result } from 'src/common/result/Result';
import { OrderStatus } from '../valueobjects/OrderStatus';
import { OrderPrewievDto } from 'src/orders/Application/dto/output/order-preview-dto';
import { OrderFullViewDto } from 'src/orders/Application/dto/output/order-fullview-dto';
import { SalesReportDto } from 'src/orders/Application/dto/output/sales-report-dto';

export interface IVendorOrderService {
  ViewRestaurantOrdersByStatus(
    idRestaurant: string,
    selectedOrderStatus: OrderStatus[],
  ): Promise<Result<OrderPrewievDto[] | null>>;

  ViewFullOrder(idOrder: string): Promise<Result<OrderFullViewDto>>;

  ChangeOrderStatus(
    orderId: string,
    newStatus: OrderStatus,
  ): Promise<Result<boolean>>;

  GetMonthlySalesReport(restaurantId: string): Promise<Result<SalesReportDto>>;
}

export const VENDOR_ORDER_SERVICE = Symbol('IVendorOrderService');
