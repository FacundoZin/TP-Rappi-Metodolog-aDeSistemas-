import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { Stars } from '../valueObjects/stars';

@Entity({ name: 'reviews' })
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  comment: string;

  @Column({ type: 'varchar', length: 100 })
  username: string;

  @Column(() => Stars)
  stars: Stars;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.reviews, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;
}
