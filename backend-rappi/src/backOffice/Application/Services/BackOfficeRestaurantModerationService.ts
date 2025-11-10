import { RestaurantBackofficeViewDto } from 'src/common/Dtos/restaurant-Backoffice-view.dto';
import { Result } from 'src/common/result/Result';
import { Inject } from '@nestjs/common';
import {
  type IRestaurantModeration,
  RESTAURANT_MODERATION_SERVICE,
} from 'src/restaurants/domain/ServiceInterfaces/Moderation/IRestaurantModeration';
import {
  RESTAURANT_PROVIDER,
  type IRestaurantProvider,
} from 'src/restaurants/domain/Ports/restaurant-provider.interface';
import { IBackofficeRestaurantModerationService } from 'src/backOffice/Domain/serviceInterfaces/IBackOfficeRestarantModerationService';

export class BackOfficeRestaurantModerationService
  implements IBackofficeRestaurantModerationService
{
  constructor(
    @Inject(RESTAURANT_MODERATION_SERVICE)
    private readonly moderationService: IRestaurantModeration,
    @Inject(RESTAURANT_PROVIDER)
    private readonly restaurantAdapter: IRestaurantProvider,
  ) {}

  async listPendingRestaurants(): Promise<
    Result<RestaurantBackofficeViewDto[]>
  > {
    try {
      const result = await this.restaurantAdapter.ProvideRestaurantsPendings();

      if (!result.success) {
        return Result.fail(result.message!, result.errorcode!);
      }

      return Result.ok(result.data!);
    } catch (error) {
      return Result.fail('Error al listar restaurantes pendientes', 500);
    }
  }

  async approveRestaurant(idRestaurant: string): Promise<Result<void>> {
    try {
      const result =
        await this.moderationService.approveRestaurant(idRestaurant);
      if (!result.success) {
        return Result.fail(result.data!, result.errorcode!);
      }
      return Result.ok(undefined);
    } catch (error) {
      return Result.fail('Error al aprobar el restaurante', 500);
    }
  }

  async rejectRestaurant(idRestaurant: string): Promise<Result<void>> {
    try {
      const result =
        await this.moderationService.rejectRestaurant(idRestaurant);
      if (!result.success) {
        return Result.fail(result.data!, result.errorcode!);
      }
      return Result.ok(undefined);
    } catch (error) {
      return Result.fail('Error al aprobar el restaurante', 500);
    }
  }
}
