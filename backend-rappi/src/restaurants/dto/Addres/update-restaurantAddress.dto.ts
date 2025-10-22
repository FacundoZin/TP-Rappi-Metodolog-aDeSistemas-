// dto/update-restaurant-address.dto.ts
import { RestaurantAddress } from "../../entities/restaurant-addres";

export class UpdateRestaurantAddressDto {
  street?: string;
  main?: string;
  city?: string;
  province?: string;
  country?: string;

  // Método para mappear el DTO sobre una entidad existente
  toEntity(existing?: RestaurantAddress): RestaurantAddress {
    const address = existing || new RestaurantAddress();
    if (this.street !== undefined) address.street = this.street;
    if (this.main !== undefined) address.main = this.main;
    if (this.city !== undefined) address.city = this.city;
    if (this.province !== undefined) address.province = this.province;
    if (this.country !== undefined) address.country = this.country;
    return address;
  }
}
