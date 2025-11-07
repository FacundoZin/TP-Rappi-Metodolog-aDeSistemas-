// src/orders/Application/mappers/order.mapper.ts
import { Order } from 'src/orders/Domain/entities/order.entity';
import { OrderItem } from 'src/orders/Domain/entities/order-item.entity';
import { UserVendor } from 'src/vendors/Domain/entities/vendor.entity';
import { ProductOrderInfoDto } from 'src/restaurants/Application/Dtos/Prodcut/Output/produt-order-info.dto';
import { VendorOrderInfoDto } from 'src/vendors/Application/dto/vendor-order-info.dto';
import { CreateOrderDto } from '../dto/input/create-order.dto';
import { OrderStatus } from 'src/orders/Domain/valueobjects/OrderStatus';
import { OrderFullViewDto } from '../dto/output/order-fullview-dto';
import { OrderItemViewDto } from '../dto/output/orderItem-view.dto';
import { UserInfoForOrderDto } from 'src/users/Aplication/dto/user/provide-user-info.dto';

export class OrderMapper {
  static fromCreateDto(
    dto: CreateOrderDto,
    userInfo: UserInfoForOrderDto,
    restaurantInfo: any,
    productsInfo: ProductOrderInfoDto[],
    vendorInfo: VendorOrderInfoDto,
  ): Order {
    const items: OrderItem[] = productsInfo.map((p) => {
      const itemDto = dto.orderItems.find((i) => i.idProduct === p.id);
      return {
        quantity: itemDto?.quantity ?? 1,
        procutPrice: p.price,
        productName: p.name,
      } as OrderItem;
    });

    const totalAmount = items.reduce(
      (sum, item) => sum + item.procutPrice * item.quantity,
      0,
    );

    const order: Order = {
      status: OrderStatus.PENDING,
      restaurantId: dto.restaurantId,
      restaurantName: restaurantInfo.RestaurantName,
      restaurantAddress: restaurantInfo.RestaurantAddress,
      userId: dto.userId,
      userName: userInfo.username,
      userAddress: userInfo.useraddrres,
      userEmail: userInfo.useremail,
      vendorEmail: vendorInfo.email,
      userVendor: { id: vendorInfo.id } as UserVendor,
      items,
      totalAmount,
      metodoPago: dto.metodoPago,
    } as Order;

    return order;
  }

  static toFullViewDto(order: Order): OrderFullViewDto {
    return {
      id: order.id,
      orderDate: order.orderDate,
      status: order.status,
      restaurantId: order.restaurantId,
      restaurantName: order.restaurantName,
      restaurantAddress: order.restaurantAddress,
      userId: order.userId,
      userName: order.userName,
      userAddress: order.userAddress,
      userEmail: order.userEmail,
      vendorEmail: order.vendorEmail,
      metodoPago: order.metodoPago,
      totalAmount: order.items.reduce(
        (sum, item) => sum + Number(item.procutPrice) * item.quantity,
        0,
      ),
      items: order.items.map<OrderItemViewDto>((i) => ({
        productName: i.productName,
        quantity: i.quantity,
        procutPrice: i.procutPrice,
      })),
    };
  }
}
