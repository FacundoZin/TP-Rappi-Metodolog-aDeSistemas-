import {
  Entity,
  OneToOne,
  JoinColumn,
  OneToMany,
  Column,
  PrimaryColumn,
} from 'typeorm';
import { CartItem } from './cart-item.entity';
import { User } from 'src/usersAccount/Domain/entities/user.entity';

@Entity({ name: 'carts' })
export class Cart {
  // Usamos el id del usuario como PK
  @PrimaryColumn('uuid', { name: 'user_id' })
  userId: string;

  // Relación uno a uno con usuario
  @OneToOne(() => User, (user) => user.cart, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'uuid', nullable: true, name: 'restaurant_id' })
  restaurantId: string | null;

  // Lista de productos en el carrito
  @OneToMany(() => CartItem, (item) => item.cart, {
    cascade: true,
    eager: true,
  })
  items: CartItem[];

  // Total del carrito
  @Column({ type: 'decimal', default: 0 })
  total: number;
}
