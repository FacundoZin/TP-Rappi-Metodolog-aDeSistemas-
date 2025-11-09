import {
  Controller,
  Get,
  Patch,
  Param,
  HttpException,
  Inject,
  UseGuards,
  UnauthorizedException,
  ForbiddenException,
  Req,
} from '@nestjs/common';
import { AdminOnly } from 'src/auth/Decorators/decorators';
import {
  BACKOFFICE_RESTAURANT_MODERATION_SERVICE,
  type IBackofficeRestaurantModerationService,
} from 'src/backOffice/Domain/IBackOfficeRestarantModerationService';

@AdminOnly()
@Controller('admin/restaurants/moderation')
export class AdminRestaurantModerationController {
  constructor(
    @Inject(BACKOFFICE_RESTAURANT_MODERATION_SERVICE)
    private readonly moderationService: IBackofficeRestaurantModerationService,
  ) {}

  @Get('pending')
  async listPendingRestaurants(@Req() req) {
    this.verifyAdminAccess(req);
    const result = await this.moderationService.listPendingRestaurants();

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }

    return result.data;
  }

  @Patch(':restaurantId/approve')
  async approveRestaurant(
    @Req() req,
    @Param('restaurantId') restaurantId: string,
  ) {
    this.verifyAdminAccess(req);
    const result = await this.moderationService.approveRestaurant(restaurantId);

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }

    return { message: 'Restaurante aprobado correctamente' };
  }

  @Patch(':restaurantId/reject')
  async rejectRestaurant(
    @Req() req,
    @Param('restaurantId') restaurantId: string,
  ) {
    this.verifyAdminAccess(req);
    const result = await this.moderationService.rejectRestaurant(restaurantId);

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }

    return { message: 'Restaurante rechazado correctamente' };
  }

  private verifyAdminAccess(req: any) {
    if (!req.user) {
      throw new UnauthorizedException('Usuario no autenticado');
    }

    if (req.user.role !== 'admin') {
      throw new ForbiddenException(
        'Acceso denegado: se requiere rol de administrador',
      );
    }
  }
}
