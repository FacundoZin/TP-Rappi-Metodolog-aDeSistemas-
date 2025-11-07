import { Review } from 'src/restaurants/domain/entities/review.entity';
import { ReviewCreatedDto } from '../Dtos/Reviews/Output/review-created.dto';
import { ReviewDto } from '../Dtos/Reviews/Output/review.dto';

export class reviewMapper {
  static toReviewCreatedDto(review: Review): ReviewCreatedDto {
    return {
      id: review.id,
      comment: review.comment,
      createdAt: review.createdAt,
    };
  }

  static toReviewDto(review: Review): ReviewDto {
    return {
      username: review.username,
      stars: review.stars.getValue(),
      comment: review.comment,
      createdAt: review.createdAt,
    };
  }
}
