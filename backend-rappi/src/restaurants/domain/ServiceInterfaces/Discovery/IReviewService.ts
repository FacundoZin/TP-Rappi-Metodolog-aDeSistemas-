import { Result } from 'src/common/result/Result';
import { CreateReviewDto } from 'src/restaurants/Application/Dtos/Reviews/Input/create-review.dto';
import { ReviewCreatedDto } from 'src/restaurants/Application/Dtos/Reviews/Output/review-created.dto';
import { ReviewSummaryDto } from 'src/restaurants/Application/Dtos/Reviews/Output/review-summary.dto';
import { ReviewDto } from 'src/common/Dtos/review.dto';

export interface IReviewService {
  createReview(
    dto: CreateReviewDto,
    userName: string,
  ): Promise<Result<ReviewCreatedDto>>;
  getReviewsByRestaurant(
    restaurantId: string,
  ): Promise<Result<ReviewDto[] | []>>;

  getAverageStars(
    restaurantId: string,
  ): Promise<Result<ReviewSummaryDto | null>>;
}

export const REVIEW_SERVICE = Symbol('IReviewService');
