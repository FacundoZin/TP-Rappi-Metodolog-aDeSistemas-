import { RestaurantAddress } from 'src/restaurants/domain/entities/restaurant-addres.entity';
import { CreateRestaurantAddressDto } from '../Dtos/Addres/Input/create.restaurantAddress.dto';
import { UpdateRestaurantAddressDto } from '../Dtos/Addres/Input/update-restaurantAddress.dto';

export class RestaurantAddressMapper {
  static formCreateDto(dto: CreateRestaurantAddressDto): RestaurantAddress {
    const restaurantAddres = new RestaurantAddress();

    restaurantAddres.street = dto.street;
    restaurantAddres.height = dto.main;
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
      addressExisting.height = dto.main;
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
