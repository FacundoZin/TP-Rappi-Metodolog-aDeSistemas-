import { Module } from '@nestjs/common';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { BACKOFFICE_RESTAURANT_MODERATION_SERVICE } from './Domain/serviceInterfaces/IBackOfficeRestarantModerationService';
import { BACKOFFICE_RESTAURANREVIEW_MODERATION_SERVICE } from './Domain/serviceInterfaces/IBackOfficeReviewsModerationService';
import { BackOfficeRestaurantModerationService } from './Application/Services/BackOfficeRestaurantModerationService';
import { BackOfficeRestaurantReviewModerationService } from './Application/Services/BackOfficeRestaurantReviewModerationService';
import { UsersAccountModule } from 'src/usersAccount/userAccount.module';
import { VendorsAccountModule } from 'src/vendorsAccount/vendors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Claim } from './Domain/Entities/claim.entity';
import { CLAIM_SERVICE } from './Domain/serviceInterfaces/IClaimService';
import { ClaimService } from './Application/Services/ClaimService';
import { CLAIM_MANAGMENT_SERVICE } from './Domain/serviceInterfaces/IClaimManagmentService';
import { ClaimModerationService } from './Application/Services/ClaimModerationService';

@Module({
  imports: [
    RestaurantsModule,
    UsersAccountModule,
    VendorsAccountModule,
    TypeOrmModule.forFeature([Claim]),
  ],
  providers: [
    {
      provide: BACKOFFICE_RESTAURANT_MODERATION_SERVICE,
      useClass: BackOfficeRestaurantModerationService,
    },
    {
      provide: BACKOFFICE_RESTAURANREVIEW_MODERATION_SERVICE,
      useClass: BackOfficeRestaurantReviewModerationService,
    },
    {
      provide: CLAIM_SERVICE,
      useClass: ClaimService,
    },
    {
      provide: CLAIM_MANAGMENT_SERVICE,
      useClass: ClaimModerationService,
    },
  ],
  exports: [
    BACKOFFICE_RESTAURANREVIEW_MODERATION_SERVICE,
    BACKOFFICE_RESTAURANT_MODERATION_SERVICE,
    CLAIM_SERVICE,
    CLAIM_MANAGMENT_SERVICE,
  ],
})
export class BackOfficeModule {}
