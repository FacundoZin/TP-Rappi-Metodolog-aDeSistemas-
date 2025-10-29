import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column('text')
  description: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  price: number;

  @Column({ type: 'boolean', default: true })
  isAvailable: boolean;

  // Relaciones
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.products, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  private makeAvailable(): void {
    if (this.isAvailable) {
      return;
    }
    this.isAvailable = true;
  }

  private makeUnavailable(): void {
    if (!this.isAvailable) {
      return;
    }
    this.isAvailable = false;
  }

  public setAvailability(status: boolean): void {
    if (status === true) {
      this.makeAvailable();
    } else {
      this.makeUnavailable();
    }
  }
}
