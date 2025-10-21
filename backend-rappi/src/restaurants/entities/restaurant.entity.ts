import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { User } from '../../users/entities/user.entity';
import { Product } from './product.entity';
import { RestaurantAddress } from './restaurant-addres';

export enum RestaurantCategory {
  PIZZERIA = 'PIZZERIA',
  HAMBURGUESERIA = 'HAMBURGUESERIA',
  PARRILLA = 'PARRILLA',
  VEGETARIANO = 'VEGETARIANO',
  VEGANO = 'VEGANO',
  SUSHI = 'SUSHI',
  ARABE = 'ARABE',
  CHINO = 'CHINO',
  MEXICANO = 'MEXICANO',
  PERUANO = 'PERUANO',
  CAFETERIA = 'CAFETERIA',
  PANADERIA = 'PANADERIA',
  POSTRES = 'POSTRES',
  RAPIDA = 'RAPIDA',
  GOURMET = 'GOURMET',
}

@Entity({ name: 'restaurants' })
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column('text')
  description: string;

  @Column({type: 'enum', enum: RestaurantCategory})
  category: RestaurantCategory

  // Relaciones
  @ManyToOne(() => User, (user) => user.restaurants, { onDelete: 'CASCADE' })
  owner: User;

  @OneToMany(() => Product, (product) => product.restaurant)
  products: Product[];

  @OneToMany(() => Order, (order) => order.restaurant)
  orders: Order[];

  @ManyToOne(() => RestaurantAddress, (address) => address.restaurants, {cascade: true, eager: true,})
  address: RestaurantAddress
}
