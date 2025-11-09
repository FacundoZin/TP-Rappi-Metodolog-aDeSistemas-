import { ReviewDto } from 'src/common/Dtos/review.dto';
import { Result } from 'src/common/result/Result';
import { IReviewsProvider } from 'src/restaurants/domain/Ports/reviews-provider.interface';

export class ReviewsAdapter implements IReviewsProvider {
  ProvideReviewsPendings(): Promise<Result<ReviewDto[]>> {
    throw new Error('Method not implemented.');
  }
}
