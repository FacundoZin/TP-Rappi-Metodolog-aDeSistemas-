import { UserRole } from '../../../common/enum/user-role';
import { Order } from '../../../orders/Domain/entities/order.entity';
import { Restaurant } from '../../../restaurants/domain/entities/restaurant.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'vendor' })
export class UserVendor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  googleId: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.VENDOR,
  })
  role: UserRole;

  @OneToMany(() => Order, (order) => order.userVendor)
  orders: Order[];

  @OneToMany(() => Restaurant, (restaurant) => restaurant.owner)
  restaurants: Restaurant[];
}
