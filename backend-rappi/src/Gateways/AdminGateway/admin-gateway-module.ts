import { Module } from '@nestjs/common';
import { BackOfficeModule } from 'src/backOffice/backOffice.module';
import { AdminClaimModerationController } from './Controllers/adminMangamentClaims-controller';
import { AdminRestaurantModerationController } from './Controllers/adminRestaurantModeration-controller';
import { AdminReviewModerationController } from './Controllers/adminReviewModeration-controller';

@Module({
  imports: [BackOfficeModule],
  controllers: [
    AdminClaimModerationController,
    AdminRestaurantModerationController,
    AdminReviewModerationController,
  ],
})
export class AdminGatewayModule {}
