import {
  Controller,
  Get,
  Patch,
  Param,
  HttpException,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';
import {
  BACKOFFICE_RESTAURANREVIEW_MODERATION_SERVICE,
  type IBackofficeRestaurantReviewModerationService,
} from 'src/backOffice/Domain/IBackOfficeReviewsModerationService';

@Controller('admin/reviews/moderation')
@UseGuards(JwtAuthGuard)
export class AdminReviewModerationController {
  constructor(
    @Inject(BACKOFFICE_RESTAURANREVIEW_MODERATION_SERVICE)
    private readonly reviewModerationService: IBackofficeRestaurantReviewModerationService,
  ) {}

  @Get('pending')
  async listPendingReviews() {
    const result = await this.reviewModerationService.listPendingReviews();

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }

    return result.data;
  }

  @Patch(':reviewId/approve')
  async approveReview(@Param('reviewId') reviewId: string) {
    const result = await this.reviewModerationService.approveReview(reviewId);

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }

    return { message: 'Reseña aprobada correctamente' };
  }

  @Patch(':reviewId/reject')
  async rejectReview(@Param('reviewId') reviewId: string) {
    const result = await this.reviewModerationService.rejectReview(reviewId);

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }

    return { message: 'Reseña rechazada correctamente' };
  }
}
