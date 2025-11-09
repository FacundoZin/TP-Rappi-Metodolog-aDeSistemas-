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
  BACKOFFICE_RESTAURANT_MODERATION_SERVICE,
  type IBackofficeRestaurantModerationService,
} from 'src/backOffice/Domain/IBackOfficeRestarantModerationService';

@Controller('admin/restaurants/moderation')
@UseGuards(JwtAuthGuard)
export class AdminRestaurantModerationController {
  constructor(
    @Inject(BACKOFFICE_RESTAURANT_MODERATION_SERVICE)
    private readonly moderationService: IBackofficeRestaurantModerationService,
  ) {}

  @Get('pending')
  async listPendingRestaurants() {
    const result = await this.moderationService.listPendingRestaurants();

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }

    return result.data;
  }

  @Patch(':restaurantId/approve')
  async approveRestaurant(@Param('restaurantId') restaurantId: string) {
    const result = await this.moderationService.approveRestaurant(restaurantId);

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }

    return { message: 'Restaurante aprobado correctamente' };
  }

  @Patch(':restaurantId/reject')
  async rejectRestaurant(@Param('restaurantId') restaurantId: string) {
    const result = await this.moderationService.rejectRestaurant(restaurantId);

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }

    return { message: 'Restaurante rechazado correctamente' };
  }
}
