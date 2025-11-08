import { Result } from 'src/common/result/Result';

export interface IUserFavoritesService {
  addFavorite(userId: string, restaurantId: string): Promise<Result<void>>;
  removeFavorite(userId: string, restaurantId: string): Promise<Result<void>>;
}

export const USERS_FAVORITES_SERVICE = Symbol('IUserFavoritesService');
