// dto/create-restaurant-address.dto.ts
import { RestaurantAddress } from "../../entities/restaurant-addres";

export class CreateRestaurantAddressDto {
  street: string;
  main: string;
  city: string;
  province: string;
  country: string;

  // Método para mappear el DTO a la entidad
  toEntity(): RestaurantAddress {
    const address = new RestaurantAddress();
    address.street = this.street;
    address.main = this.main;
    address.city = this.city;
    address.province = this.province;
    address.country = this.country;
    return address;
  }
}
