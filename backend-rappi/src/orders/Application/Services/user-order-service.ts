import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/Domain/entities/order.entity';
import { In, Repository } from 'typeorm';
import { ProductAdapter } from 'src/restaurants/Infraestructure/Adapters/product-adapter';
import { RestaurantAdapter } from 'src/restaurants/Infraestructure/Adapters/restaurant-adapter';
import { OrderMapper } from '../mappers/order-mapper';
import { VendorAdapter } from 'src/vendors/Infrastructure/Adapter/vendor-adapter';
import { CreateOrderDto } from '../dto/input/create-order.dto';
import { OrderPrewievDto } from '../dto/output/order-preview-dto';
import { OrderStatusHelper } from 'src/orders/Domain/valueobjects/OrderStatus';
import { EmailServie } from 'src/orders/Infraestructure/EmailService/email-service';
import { Result } from 'src/common/result/Result';

@Injectable()
export class UserOrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    private readonly productAdapter: ProductAdapter,
    private readonly restaurantAdapter: RestaurantAdapter,
    private readonly vendorAdapter: VendorAdapter,
    private readonly emailService: EmailServie,
  ) {}

  async CreateOrder(dto: CreateOrderDto): Promise<Result<boolean>> {
    const restaurantInfo = await this.restaurantAdapter.ProvideInfoToOrder(
      dto.restaurantId,
    );
    const productsInfo = await this.productAdapter.ProvideInfoToOrderItem(
      dto.orderItems.map((itmes) => itmes.idProduct),
    );
    const vendorInfo = await this.vendorAdapter.ProvideVendorEmail(
      dto.restaurantId,
    );

    if (!restaurantInfo)
      return Result.fail('info de restaurante no encontrada', 404);

    if (!productsInfo)
      return Result.fail('info de productos no encontrada', 404);

    if (!vendorInfo)
      return Result.fail('email del restaurante no encontrado', 404);

    const order = OrderMapper.fromCreateDto(
      dto,
      restaurantInfo,
      productsInfo,
      vendorInfo,
    );

    try {
      await this.orderRepo.save(order);
      this.emailService
        .notifyUser(dto.userEmail)
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
}
