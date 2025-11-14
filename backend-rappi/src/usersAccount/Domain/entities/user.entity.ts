import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { UserAddress } from './user-address.entity';
import { Cart } from '../../../carrito/Domain/entities/cart.entity';
import { UserRole } from '../../../common/enum/user-role';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  googleId: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  role: UserRole;

  // Relaciones
  @OneToMany(() => UserAddress, (address) => address.user, { cascade: true })
  addresses: UserAddress[];

  @OneToOne(() => Cart, (cart) => cart.user, { cascade: true })
  cart: Cart;
}
