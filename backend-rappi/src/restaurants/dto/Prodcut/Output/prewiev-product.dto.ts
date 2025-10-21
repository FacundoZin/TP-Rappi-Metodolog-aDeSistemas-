export class ProductPrewievDto {
  id: string;
  name: string;
  description: string;
  price: number

  constructor(partial: Partial<ProductPrewievDto>) {
    Object.assign(this, partial);
  }
}
