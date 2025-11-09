import { Module } from '@nestjs/common';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { BACKOFFICE_RESTAURANT_MODERATION_SERVICE } from './Domain/IBackOfficeRestarantModerationService';
import { BackOfficeRestaurantModerationService } from './Application/BackOfficeRestaurantModerationService';
import { BACKOFFICE_RESTAURANREVIEW_MODERATION_SERVICE } from './Domain/IBackOfficeReviewsModerationService';
import { BackOfficeRestaurantReviewModerationService } from './Application/BackOfficeRestaurantReviewModerationService';

@Module({
  imports: [RestaurantsModule],
  providers: [
    {
      provide: BACKOFFICE_RESTAURANT_MODERATION_SERVICE,
      useClass: BackOfficeRestaurantModerationService,
    },
    {
      provide: BACKOFFICE_RESTAURANREVIEW_MODERATION_SERVICE,
      useClass: BackOfficeRestaurantReviewModerationService,
    },
  ],
  exports: [
    BACKOFFICE_RESTAURANREVIEW_MODERATION_SERVICE,
    BACKOFFICE_RESTAURANT_MODERATION_SERVICE,
  ],
})
export class BackOfficeModule {}
