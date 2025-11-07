import { Column } from 'typeorm';

export class Stars {
  @Column({ type: 'int' })
  private quantity: number;

  constructor(quantity: number) {
    if (quantity < 1 || quantity > 5) {
      throw new Error('La cantidad de estrellas debe estar entre 1 y 5');
    }
    this.quantity = quantity;
  }

  getValue(): number {
    return this.quantity;
  }
}
