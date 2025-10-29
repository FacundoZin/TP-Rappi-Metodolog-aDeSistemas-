export class RestaurantAddressPreviewDto {
  street: string;
  height: string;
  city: string;
  province: string;
  country: string;

  constructor(partial: Partial<RestaurantAddressPreviewDto>) {
    Object.assign(this, partial);
  }
}
