import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';
import type { RequestWithUser } from 'src/common/HttpRequestWithUser/IRequestWithUser';
import { CreateOrderDto } from 'src/orders/Application/dto/input/create-order.dto';
import {
  type IUserOrderService,
  USER_ORDER_SERVICE,
} from 'src/orders/Domain/ServiceInterfaces/IUserOrderService';

@Controller('userOrders')
@UseGuards(JwtAuthGuard)
export class UserOrdersController {
  constructor(
    @Inject(USER_ORDER_SERVICE)
    private readonly userOrderService: IUserOrderService,
  ) {}

  @Post()
  @HttpCode(204)
  async CreateOrder(@Req() req: RequestWithUser, @Body() dto: CreateOrderDto) {
    const result = await this.userOrderService.CreateOrder(req.user.sub, dto);
    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }
  }

  @Get()
  async GetUserOrders(@Req() req: RequestWithUser) {
    const result = await this.userOrderService.GetUserOrdersPreview(
      req.user.sub,
    );

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }

    return result.data;
  }

  @Get(':idOrder/summary')
  async getOrderSummary(@Param('idOrder') idOrder: string) {
    const result = await this.userOrderService.seeOrderSumarry(idOrder);

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }

    return result.data;
  }
}
