export enum OrderStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  PREPARING = 'PREPARING',
  DISPATCHED = 'DISPATCHED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export class OrderStatusHelper {
  static activeStatuses(): OrderStatus[] {
    return [
      OrderStatus.PENDING,
      OrderStatus.ACCEPTED,
      OrderStatus.PREPARING,
      OrderStatus.DISPATCHED,
    ];
  }

  static notDelivered(): OrderStatus[] {
    return [OrderStatus.DELIVERED, OrderStatus.CANCELLED];
  }
}
