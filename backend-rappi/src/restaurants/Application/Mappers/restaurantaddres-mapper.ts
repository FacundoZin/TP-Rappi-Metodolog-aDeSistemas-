import { RestaurantAddress } from 'src/restaurants/domain/entities/restaurant-addres';
import { CreateRestaurantAddressDto } from '../dto/Addres/Input/create.restaurantAddress.dto';
import { UpdateRestaurantAddressDto } from '../dto/Addres/Input/update-restaurantAddress.dto';
import { Restaurant } from 'src/restaurants/domain/entities/restaurant.entity';
import { RestaurantOrderInfoDto } from '../dto/Restaurant/Output/order-info-restaurant.dto';

export class RestaurantAddressMapper {
  static formCreateDto(dto: CreateRestaurantAddressDto): RestaurantAddress {
    const restaurantAddres = new RestaurantAddress();

    restaurantAddres.street = dto.street;
    restaurantAddres.Heigth = dto.main;
    restaurantAddres.city = dto.city;
    restaurantAddres.province = dto.province;
    restaurantAddres.country = dto.country;

    return restaurantAddres;
  }
  static fromUpdateDto(
    dto: UpdateRestaurantAddressDto,
    addressExisting: RestaurantAddress,
  ): RestaurantAddress {
    if (dto.street !== undefined) {
      addressExisting.street = dto.street;
    }
    if (dto.main !== undefined) {
      addressExisting.Heigth = dto.main;
    }
    if (dto.city !== undefined) {
      addressExisting.city = dto.city;
    }
    if (dto.province !== undefined) {
      addressExisting.province = dto.province;
    }
    if (dto.country !== undefined) {
      addressExisting.country = dto.country;
    }
    return addressExisting;
  }
}
