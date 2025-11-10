import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/Domain/entities/order.entity';
import { In, Repository } from 'typeorm';
import { OrderMapper } from '../mappers/order-mapper';
import { CreateOrderDto } from '../dto/input/create-order.dto';
import { OrderPrewievDto } from '../dto/output/order-preview-dto';
import { OrderStatusHelper } from 'src/orders/Domain/valueobjects/OrderStatus';
import { Result } from 'src/common/result/Result';
import { IUserOrderService } from 'src/orders/Domain/ServiceInterfaces/IUserOrderService';
import { OrderFullViewDto } from '../dto/output/order-fullview-dto';
import {
  type IProductProvider,
  PRODUCT_PROVIDER,
} from 'src/restaurants/domain/Ports/product-provider.interface';
import {
  type IRestaurantProvider,
  RESTAURANT_PROVIDER,
} from 'src/restaurants/domain/Ports/restaurant-provider.interface';
import {
  type IUserProvider,
  USER_PROVIDER,
} from 'src/usersAccount/Domain/Ports/user-provider-interface';
import {
  type IVendorProvider,
  VENDOR_PROVIDER,
} from 'src/vendorsAccount/Domain/port/IVendorProvider';
import {
  EMAIL_SERVICE,
  type IEmailService,
} from 'src/orders/Domain/ServiceInterfaces/IEmailService';

@Injectable()
export class UserOrderService implements IUserOrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @Inject(PRODUCT_PROVIDER)
    private readonly productAdapter: IProductProvider,
    @Inject(RESTAURANT_PROVIDER)
    private readonly restaurantAdapter: IRestaurantProvider,
    @Inject(VENDOR_PROVIDER)
    private readonly vendorAdapter: IVendorProvider,
    @Inject(USER_PROVIDER)
    private readonly userAdapter: IUserProvider,
    @Inject(EMAIL_SERVICE)
    private readonly emailService: IEmailService,
  ) {}

  async CreateOrder(
    userId: string,
    dto: CreateOrderDto,
  ): Promise<Result<boolean>> {
    const restaurantInfo = await this.restaurantAdapter.ProvideInfoToOrder(
      dto.restaurantId,
    );
    const productsInfo = await this.productAdapter.ProvideInfoToOrderItem(
      dto.orderItems.map((itmes) => itmes.idProduct),
    );
    const vendorInfo = await this.vendorAdapter.ProvideVendorEmail(
      dto.restaurantId,
    );
    const userInfo = await this.userAdapter.ProvideUserInfoForOrder(
      userId,
      dto.addresId,
    );

    if (!userInfo.success) {
      return Result.fail(userInfo.message!, userInfo.errorcode!);
    }
    if (!restaurantInfo)
      return Result.fail('info de restaurante no encontrada', 404);

    if (!productsInfo)
      return Result.fail('info de productos no encontrada', 404);

    if (!vendorInfo)
      return Result.fail('email del restaurante no encontrado', 404);

    const order = OrderMapper.fromCreateDto(
      userId,
      dto,
      userInfo.data!,
      restaurantInfo,
      productsInfo,
      vendorInfo,
    );

    try {
      await this.orderRepo.save(order);
      this.emailService
        .notifyVendor(vendorInfo.email, 'nuevo pedido solicitado!')
        .catch((err) => console.error('Error enviando email:', err));
      return Result.ok(true);
    } catch (error) {
      console.error('Error al crear la orden:', error);
      return Result.fail('Error al guardar la orden en la base de datos', 500);
    }
  }

  async GetUserOrdersPreview(
    userId: string,
  ): Promise<Result<OrderPrewievDto[] | null>> {
    try {
      const orders = await this.orderRepo.find({
        where: {
          userId: userId,
          status: In([OrderStatusHelper.activeStatuses()]),
        },
        relations: ['items'],
        order: { orderDate: 'DESC' },
      });

      if (!orders || orders.length === 0) {
        return Result.ok(null);
      }

      const previews: OrderPrewievDto[] = orders.map((o) => ({
        id: o.id,
        status: o.status,
        restaurantName: o.restaurantName,
        createdAt: o.orderDate,
        totalAmount: o.items.reduce(
          (sum, item) => sum + Number(item.procutPrice) * item.quantity,
          0,
        ),
      }));

      return Result.ok(previews);
    } catch (error) {
      console.error('Error al obtener las órdenes del usuario:', error);
      return Result.fail('Error al consultar las órdenes', 500);
    }
  }

  async seeOrderSumarry(idOrder: string): Promise<Result<OrderFullViewDto>> {
    try {
      const order = await this.orderRepo.findOne({
        where: { id: idOrder },
        relations: ['items'],
      });

      if (!order) {
        return Result.fail('Orden no encontrada', 404);
      }

      const dto = OrderMapper.toFullViewDto(order);

      return Result.ok(dto);
    } catch (error) {
      console.error('Error al obtener el resumen de orden:', error);
      return Result.fail('Error al consultar la orden', 500);
    }
  }
}
