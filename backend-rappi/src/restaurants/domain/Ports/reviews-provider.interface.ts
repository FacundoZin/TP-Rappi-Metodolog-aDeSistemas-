import { ReviewDto } from 'src/common/Dtos/review.dto';
import { Result } from 'src/common/result/Result';

export interface IReviewsProvider {
  ProvideReviewsPendings(): Promise<Result<ReviewDto[]>>;
}

export const REVIEW_PROVIDER = Symbol('IReviewsProvider');
