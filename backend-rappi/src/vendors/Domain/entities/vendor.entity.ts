import { Order } from 'src/orders/Domain/entities/order.entity';
import { Restaurant } from 'src/restaurants/domain/entities/restaurant.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'vendor' })
export class UserVendor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password?: string; // El '?' es porque no siempre querremos devolverlo

  @OneToMany(() => Order, (order) => order.userVendor)
  orders: Order[];

  @OneToMany(() => Restaurant, (restaurant) => restaurant.owner)
  restaurants: Restaurant[];
}
