import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { RestaurantAddress } from 'src/restaurants/entities/restaurant-addres';
import { Restaurant, RestaurantCategory } from 'src/restaurants/entities/restaurant.entity';
import { User } from 'src/users/entities/user.entity';

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
    restaurant.owner = { id: this.ownerId } as User; 
    restaurant.address = addres;
    return restaurant;
  }
}
