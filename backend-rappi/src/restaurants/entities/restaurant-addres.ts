import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity()
export class RestaurantAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  main: string;

  @Column()
  city: string;

  @Column()
  province: string;

  @Column()
  country: string;

  @OneToMany(() => Restaurant, (restaurant) => restaurant)
  restaurants: Restaurant[];
}
