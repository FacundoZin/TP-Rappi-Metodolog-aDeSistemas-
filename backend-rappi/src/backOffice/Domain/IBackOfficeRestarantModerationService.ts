import { RestaurantBackofficeViewDto } from 'src/common/Dtos/restaurant-Backoffice-view.dto';
import { Result } from 'src/common/result/Result';

export interface IBackofficeRestaurantModerationService {
  listPendingRestaurants(): Promise<Result<RestaurantBackofficeViewDto[]>>;
  approveRestaurant(idRestaurant: string): Promise<Result<void>>;
  rejectRestaurant(idRestaurant: string): Promise<Result<void>>;
}

export const BACKOFFICE_RESTAURANT_MODERATION_SERVICE = Symbol(
  'IBackofficeRestaurantModerationService',
);
