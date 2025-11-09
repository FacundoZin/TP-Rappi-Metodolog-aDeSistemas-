import { Result } from 'src/common/result/Result';

export interface IRestaurantModeration {
  approveRestaurant(id: string): Promise<Result<void>>;
  rejectRestaurant(id: string): Promise<Result<void>>;
}

export const RESTAURANT_MODERATION_SERVICE = Symbol('IRestaurantModeration');
