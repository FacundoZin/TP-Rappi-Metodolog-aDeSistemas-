import {
  Body,
  Controller,
  Get,
  HttpException,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientOnly } from 'src/auth/Decorators/decorators';
import { type RequestWithUser } from 'src/common/HttpRequestWithUser/IRequestWithUser';
import { CreateReviewDto } from 'src/restaurants/Application/Dtos/Reviews/Input/create-review.dto';
import {
  type IRestaurantPublicService,
  RESTAURANT_PUBLIC_SERVICE,
} from 'src/restaurants/domain/ServiceInterfaces/Discovery/IRestaurantPublicService';
import {
  type IReviewService,
  REVIEW_SERVICE,
} from 'src/restaurants/domain/ServiceInterfaces/Discovery/IReviewService';

@ClientOnly()
@Controller('user/restaurants/:id/reviews')
export class RestaurantReviewsController {
  constructor(
    @Inject(RESTAURANT_PUBLIC_SERVICE)
    private readonly restaurantPublicService: IRestaurantPublicService,
    @Inject(REVIEW_SERVICE)
    private readonly reviewsService: IReviewService,
  ) {}

  @Post()
  async postReview(@Req() req: RequestWithUser, @Body() dto: CreateReviewDto) {
    const result = await this.reviewsService.createReview(dto, req.user.name);
  }

  @Get()
  async getReviews(@Param('id') restaurantId: string) {
    const result =
      await this.restaurantPublicService.getRestaurantsReviews(restaurantId);

    if (!result.success) {
      throw new HttpException(result.message!, result.errorcode!);
    }

    return result.data;
  }
}
