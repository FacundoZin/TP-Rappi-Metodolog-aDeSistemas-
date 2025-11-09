import { ReviewDto } from 'src/restaurants/Application/Dtos/Reviews/Output/review.dto';
import { IReviewsProvider } from 'src/restaurants/domain/Ports/reviews-provider';

export class ReviewsAdapter implements IReviewsProvider {
  ProvideReviewsPendings(): Promise<ReviewDto> {
    throw new Error('Method not implemented.');
  }
}
