import { InjectRepository } from '@nestjs/typeorm';
import { Result } from 'src/common/result/Result';
import { Favorites } from 'src/usersAccount/Domain/entities/favortes.entity';
import { IUserFavoritesService } from 'src/usersAccount/Domain/serviceInterfaces/IUser-favorite-service';
import { Repository } from 'typeorm';

export class UserFavoriteService implements IUserFavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private readonly favoriteRepo: Repository<Favorites>,
  ) {}

  async addFavorite(
    userId: string,
    restaurantId: string,
  ): Promise<Result<void>> {
    const exists = await this.favoriteRepo.findOne({
      where: { userId, restaurantId },
    });

    if (exists) {
      return Result.fail('El restaurante ya está en favoritos', 409);
    }

    const favorite = this.favoriteRepo.create({ userId, restaurantId });
    await this.favoriteRepo.save(favorite);

    return Result.ok(undefined);
  }

  async removeFavorite(
    userId: string,
    restaurantId: string,
  ): Promise<Result<void>> {
    const existingFavorite = await this.favoriteRepo.findOne({
      where: { userId, restaurantId },
    });

    if (!existingFavorite) {
      return Result.fail('Favorito no encontrado', 404);
    }

    await this.favoriteRepo.delete(existingFavorite.id);

    return Result.ok(undefined);
  }
}
