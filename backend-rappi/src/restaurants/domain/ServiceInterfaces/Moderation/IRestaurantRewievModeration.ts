import { Result } from 'src/common/result/Result';

export interface IRestaurantReviewModeration {
  approveReview(id: string): Promise<Result<void>>;
  rejectReview(id: string): Promise<Result<void>>;
}

export const RESTAURANT_REVIEW_MODERATION = Symbol(
  'IRestaurantReviewModeration',
);
