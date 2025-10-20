import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../restaurants/entities/product.entity';
import { Order } from './order.entity';

@Entity({ name: 'order_items' })
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 }) // Precio en el momento de la compra
  price: number;

  // Relaciones
  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  order: Order;

  @ManyToOne(() => Product, {
    eager: true,
    onDelete: 'SET NULL',
    nullable: true,
  }) // eager para traer el producto, SET NULL por si el producto se borra
  product: Product;
}
