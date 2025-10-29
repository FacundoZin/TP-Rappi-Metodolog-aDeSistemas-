import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';
import { UserVendor } from 'src/vendors/Domain/entities/vendor.entity';

export enum OrderStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  PREPARING = 'PREPARING',
  DISPATCHED = 'DISPATCHED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentMethod {
  DEBITO = 'DEBIT',
  CREDITO = 'CREDIT',
  TRANSFERENCIABANCARIA = 'TRANSFERENCIABANCARIA',
  TRANSFERENCIABILLETERAVIRTUAL = 'TRANSFERENCIABILLETERAVIRTUAL',
}

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  orderDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  // Información del restaurante (snapshot)
  @Column('uuid')
  restaurantId: string;

  @Column({ type: 'varchar', length: 255 })
  restaurantName: string;

  @Column({ type: 'varchar', length: 500 })
  restaurantAddress: string;

  @Column('uuid')
  userId: string;

  @Column({ type: 'varchar', length: 255 })
  userName: string;

  @Column('text')
  userAddress: string;

  @Column({ type: 'varchar', length: 255 })
  userEmail: string;

  @Column({ type: 'varchar', length: 255 })
  vendorEmail: string;

  @ManyToOne(() => UserVendor, (userVendor) => userVendor.orders)
  userVendor: UserVendor;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];

  @Column({ type: 'enum', enum: PaymentMethod })
  metodoPago: PaymentMethod;
}
