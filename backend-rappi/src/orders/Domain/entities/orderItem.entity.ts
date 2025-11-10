import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity({ name: 'orderitems' })
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('int')
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  procutPrice: number;

  @Column({ type: 'varchar', length: 255 })
  productName: string;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  order: Order;
}
