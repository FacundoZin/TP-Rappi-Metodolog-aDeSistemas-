export class RestaurantPreviewDto {
  id: string;
  name: string;
  description: string;

  constructor(partial: Partial<RestaurantPreviewDto>) {
    Object.assign(this, partial);
  }
}
