import { ReviewDto } from 'src/restaurants/Application/Dtos/Reviews/Output/review.dto';

export interface IReviewsProvider {
  ProvideReviewsPendings(): Promise<ReviewDto>;
}

export const REVIEW_PROVIDER = Symbol('IReviewsProvider');
