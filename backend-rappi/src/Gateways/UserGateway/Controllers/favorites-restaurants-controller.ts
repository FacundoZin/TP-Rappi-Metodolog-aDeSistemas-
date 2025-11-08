import {
  Controller,
  Post,
  Delete,
  UseGuards,
  Req,
  Param,
  HttpException,
  Inject,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';
import { type IUserFavoritesService } from 'src/usersAccount/Domain/serviceInterfaces/IUser-favorite-service';

@Controller('user/favorites')
@UseGuards(JwtAuthGuard)
export class UserFavoritesController {
  constructor(
    @Inject()
    private readonly favoritesService: IUserFavoritesService,
  ) {}

  @Post(':restaurantId')
  async addFavorite(@Req() req, @Param('restaurantId') restaurantId: string) {
    const userId = req.user.id;

    const result = await this.favoritesService.addFavorite(
      userId,
      restaurantId,
    );

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }

    return { message: 'Restaurante agregado a favoritos' };
  }

  @Delete(':restaurantId')
  async removeFavorite(
    @Req() req,
    @Param('restaurantId') restaurantId: string,
  ) {
    const userId = req.user.id;

    const result = await this.favoritesService.removeFavorite(
      userId,
      restaurantId,
    );

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }

    return { message: 'Restaurante eliminado de favoritos' };
  }
}
