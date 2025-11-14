import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Product } from './product.entity';
import { RestaurantAddress } from './restaurant-addres.entity';
import { Review } from './review.entity';
import { UserVendor } from '../../../vendorsAccount/Domain/entities/vendor.entity';
import { RestaurantStatus } from '../Enums/Restaurant.status';
import { RestaurantCategory } from '../Enums/Restaurant.category';

@Entity({ name: 'restaurants' })
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column('text')
  description: string;

  @Column({ type: 'enum', enum: RestaurantCategory })
  category: RestaurantCategory;

  @CreateDateColumn()
  createdAt: Date;

  // Relaciones
  @ManyToOne(() => UserVendor, (vendor) => vendor.restaurants, {
    onDelete: 'CASCADE',
  })
  owner: UserVendor;

  @OneToMany(() => Product, (product) => product.restaurant)
  products: Product[];

  @Column({
    type: 'enum',
    enum: RestaurantStatus,
    default: RestaurantStatus.PENDING,
  })
  status: RestaurantStatus;

  @ManyToOne(() => RestaurantAddress, (address) => address.restaurants, {
    cascade: true,
    eager: true,
  })
  address: RestaurantAddress;

  @OneToMany(() => Review, (review) => review.restaurant)
  reviews: Review[];
}
