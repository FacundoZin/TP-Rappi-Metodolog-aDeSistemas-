import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from './cart.entity';

@Entity({ name: 'cart_items' })
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: 'CASCADE' })
  cart: Cart;

  @Column('int', { default: 1 })
  quantity: number;

  productId: string;

  // Guardamos el precio actual al momento de agregar al carrito
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  productPrice: number;

  @Column({ type: 'varchar', length: 255 })
  productName: string;
}
