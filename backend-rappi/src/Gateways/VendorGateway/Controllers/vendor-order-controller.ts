import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Inject,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';
import {
  type IVendorOrderService,
  VENDOR_ORDER_SERVICE,
} from 'src/orders/Domain/ServiceInterfaces/IVendorOrderService';
import { OrderStatus } from 'src/orders/Domain/valueobjects/OrderStatus';

@Controller('vendor/order')
@UseGuards(JwtAuthGuard)
export class VendorOrderController {
  constructor(
    @Inject(VENDOR_ORDER_SERVICE)
    private readonly vendorOrderService: IVendorOrderService,
  ) {}

  @Get()
  async viewRestaurantOrders(
    @Query('idRestaurant') idRestaurant: string,
    @Query('selectedOrderStatus') selectedOrderStatus: string[],
  ) {
    const statusArray: OrderStatus[] = selectedOrderStatus as OrderStatus[];

    const result = await this.vendorOrderService.ViewRestaurantOrdersByStatus(
      idRestaurant,
      statusArray,
    );

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }

    return result.data;
  }

  @Get(':idOrder')
  async viewFullOrder(@Param('idOrder') idOrder: string) {
    const result = await this.vendorOrderService.ViewFullOrder(idOrder);

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }

    return result.data;
  }

  @Patch(':orderId')
  @HttpCode(200)
  async changeOrderStatus(
    @Param('orderId') orderId: string,
    @Body('newStatus') newStatus: OrderStatus,
  ) {
    const result = await this.vendorOrderService.ChangeOrderStatus(
      orderId,
      newStatus,
    );

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }

    return {
      success: true,
      message: `Status de orden ${orderId} actualizado a ${newStatus}`,
    };
  }
}
