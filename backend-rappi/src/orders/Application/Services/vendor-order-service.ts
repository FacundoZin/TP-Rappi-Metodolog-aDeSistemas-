import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/Domain/entities/order.entity';
import { EmailServie } from 'src/orders/Infraestructure/EmailService/email-service';
import { In, Repository } from 'typeorm';
import { OrderPrewievDto } from '../dto/output/order-preview-dto';
import { OrderStatus } from 'src/orders/Domain/valueobjects/OrderStatus';
import { Result } from '../common/result';
import { OrderFullViewDto } from '../dto/output/order-fullview-dto';
import { OrderMapper } from '../mappers/order-mapper';

@Injectable()
export class VendorOrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    private readonly emailService: EmailServie,
  ) {}

  async ViewRestaurantOrdersByStatus(
    idRestaurant: string,
    selectedOrderStatus: OrderStatus[],
  ): Promise<Result<OrderPrewievDto[] | null>> {
    try {
      const orders = await this.orderRepo.find({
        where: {
          restaurantId: idRestaurant,
          status: In([selectedOrderStatus]),
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
      console.error('Error al obtener las órdenes del restaurate:', error);
      return Result.fail('Error al consultar las órdenes del restaurante', 500);
    }
  }

  async ViewFullOrder(idOrder: string): Promise<Result<OrderFullViewDto>> {
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
      console.error('Error al obtener la orden completa:', error);
      return Result.fail('Error al consultar la orden', 500);
    }
  }

  async ChangeOrderStatus(
    orderId: string,
    newStatus: OrderStatus,
  ): Promise<Result<boolean>> {
    try {
      const order = await this.orderRepo.findOne({
        where: { id: orderId },
        relations: ['items'],
      });

      if (!order) {
        return Result.fail('Orden no encontrada', 404);
      }

      // Usamos el método de dominio para validar y cambiar el estado
      try {
        order.changeStatus(newStatus);
      } catch (err) {
        return Result.fail(err.message, 400);
      }

      // Guardamos el cambio en la base de datos
      await this.orderRepo.save(order);

      this.emailService
        .notifyUser(order.userEmail)
        .then(() => console.log('Email enviado'))
        .catch((err) => console.error('Error enviando email:', err));

      return Result.ok(true);
    } catch (error) {
      console.error('Error al cambiar el estado de la orden:', error);
      return Result.fail('Error al actualizar el estado de la orden', 500);
    }
  }
}
