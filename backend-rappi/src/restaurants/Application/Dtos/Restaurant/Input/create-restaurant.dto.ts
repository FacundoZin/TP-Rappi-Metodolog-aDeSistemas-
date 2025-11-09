import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { RestaurantAddress } from 'src/restaurants/domain/entities/restaurant-addres';
import { Restaurant } from 'src/restaurants/domain/entities/restaurant.entity';
import { RestaurantCategory } from 'src/restaurants/domain/Enums/Restaurant.category';
import { UserVendor } from 'src/vendorsAccount/Domain/entities/vendor.entity';

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(RestaurantCategory)
  @IsNotEmpty()
  category: RestaurantCategory;

  @IsString()
  @IsNotEmpty()
  ownerId: string; // Id del usuario propietario

  @IsString()
  @IsNotEmpty()
  addressId: string;

  toEntity(addres: RestaurantAddress): Restaurant {
    const restaurant = new Restaurant();
    restaurant.name = this.name;
    restaurant.description = this.description;
    restaurant.category = this.category;
    // Relaciones
    restaurant.owner = { id: this.ownerId } as UserVendor;
    restaurant.address = addres;
    return restaurant;
  }
}
