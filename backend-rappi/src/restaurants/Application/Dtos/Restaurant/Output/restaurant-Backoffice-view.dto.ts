export class RestaurantBackofficeViewDto {
  id: string;
  name: string;
  hight: string;
  street: string;
  state: string;
  country: string;
  ownerEmail: string;
  category: string;
  createdAt: Date;
  description: string;

  constructor(partial: Partial<RestaurantBackofficeViewDto>) {
    Object.assign(this, partial);
  }
}
