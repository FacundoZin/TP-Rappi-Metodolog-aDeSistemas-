import { ReviewDto } from 'src/common/Dtos/review.dto';
import { Result } from 'src/common/result/Result';
import { Inject } from '@nestjs/common';
import {
  type IRestaurantReviewModeration,
  RESTAURANT_REVIEW_MODERATION,
} from 'src/restaurants/domain/ServiceInterfaces/Moderation/IRestaurantRewievModeration';
import {
  type IReviewsProvider,
  REVIEW_PROVIDER,
} from 'src/restaurants/domain/Ports/reviews-provider.interface';
import { IBackofficeRestaurantReviewModerationService } from 'src/backOffice/Domain/serviceInterfaces/IBackOfficeReviewsModerationService';

export class BackOfficeRestaurantReviewModerationService
  implements IBackofficeRestaurantReviewModerationService
{
  constructor(
    @Inject(RESTAURANT_REVIEW_MODERATION)
    private readonly moderationService: IRestaurantReviewModeration,
    @Inject(REVIEW_PROVIDER)
    private readonly reviewsProvider: IReviewsProvider,
  ) {}

  async listPendingReviews(): Promise<Result<ReviewDto[]>> {
    try {
      const result = await this.reviewsProvider.ProvideReviewsPendings();

      if (!result.success) {
        return Result.fail(result.message!, result.errorcode!);
      }

      return Result.ok(result.data!);
    } catch (error) {
      return Result.fail('Error al listar las reseñas pendientes', 500);
    }
  }

  async approveReview(idReview: string): Promise<Result<void>> {
    try {
      const result = await this.moderationService.approveReview(idReview);

      if (!result.success) {
        return Result.fail(result.message!, result.errorcode!);
      }

      return Result.ok(undefined);
    } catch (error) {
      return Result.fail('Error al aprobar la reseña', 500);
    }
  }

  async rejectReview(idReview: string): Promise<Result<void>> {
    try {
      const result = await this.moderationService.rejectReview(idReview);

      if (!result.success) {
        return Result.fail(result.message!, result.errorcode!);
      }

      return Result.ok(undefined);
    } catch (error) {
      return Result.fail('Error al rechazar la reseña', 500);
    }
  }
}
