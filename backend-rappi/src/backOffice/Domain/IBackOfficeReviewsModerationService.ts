import { ReviewDto } from 'src/common/Dtos/review.dto';
import { Result } from 'src/common/result/Result';

export interface IBackofficeRestaurantReviewModerationService {
  listPendingReviews(): Promise<Result<ReviewDto[]>>;
  approveReview(idRestaurant: string): Promise<Result<void>>;
  rejectReview(idRestaurant: string): Promise<Result<void>>;
}

export const BACKOFFICE_RESTAURANREVIEW_MODERATION_SERVICE = Symbol(
  'IBackofficeRestaurantReviewModerationService',
);
