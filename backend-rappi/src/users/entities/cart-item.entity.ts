import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../restaurants/entities/product.entity';
import { Cart } from './cart.entity';

@Entity({ name: 'cart_items' })
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Cart, cart => cart.items, { onDelete: 'CASCADE' })
  cart: Cart;

  @ManyToOne(() => Product, { eager: true, onDelete: 'SET NULL', nullable: true })
  product: Product;

  @Column('int', { default: 1 })
  quantity: number;

  // Guardamos el precio actual al momento de agregar al carrito
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
}
