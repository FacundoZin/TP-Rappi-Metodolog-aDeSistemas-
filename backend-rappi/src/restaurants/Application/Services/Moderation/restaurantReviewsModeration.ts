import { Result } from 'src/common/result/Result';
import { IRestaurantReviewModeration } from 'src/restaurants/domain/ServiceInterfaces/Moderation/IRestaurantRewievModeration';

export class RestaurantReviewsModerationService
  implements IRestaurantReviewModeration
{
  approveReview(id: string): Promise<Result<void>> {
    throw new Error('Method not implemented.');
  }
  rejectReview(id: string): Promise<Result<void>> {
    throw new Error('Method not implemented.');
  }
}
