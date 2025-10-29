import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { Order } from '../../orders/Domain/entities/order.entity';
import { UserAddress } from './user-address.entity';
import { Cart } from '../../carrito/Domain/entities/cart.entity';
import { Restaurant } from 'src/restaurants/domain/entities/restaurant.entity';

export enum UserRole {
  CLIENT = 'CLIENT',
  VENDOR = 'VENDOR',
  ADMIN = 'ADMIN',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password?: string; // El '?' es porque no siempre querremos devolverlo

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  role: UserRole;

  // Relaciones
  @OneToMany(() => UserAddress, (address) => address.user)
  addresses: UserAddress[];

  @OneToMany(() => Restaurant, (restaurant) => restaurant.owner)
  restaurants: Restaurant[];

  @OneToOne(() => Cart, (cart) => cart.user, { cascade: true })
  cart: Cart;
}
