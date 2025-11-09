import { Result } from 'src/common/result/Result';
import { IRestaurantModeration } from 'src/restaurants/domain/ServiceInterfaces/Moderation/IRestaurantModeration';

export class RestaurantModerationService implements IRestaurantModeration {
  approveRestaurant(id: string): Promise<Result<void>> {
    throw new Error('Method not implemented.');
  }
  rejectRestaurant(id: string): Promise<Result<void>> {
    throw new Error('Method not implemented.');
  }
}
