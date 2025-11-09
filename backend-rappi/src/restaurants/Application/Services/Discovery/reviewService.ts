import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from 'src/restaurants/domain/entities/restaurant.entity';
import { Review } from 'src/restaurants/domain/entities/review.entity';
import { IReviewService } from 'src/restaurants/domain/ServiceInterfaces/Discovery/IReviewService';
import { Repository } from 'typeorm';

import { Stars } from 'src/restaurants/domain/valueObjects/stars';

import { Result } from 'src/common/result/Result';
import { CreateReviewDto } from '../../Dtos/Reviews/Input/create-review.dto';
import { ReviewCreatedDto } from '../../Dtos/Reviews/Output/review-created.dto';
import { reviewMapper } from '../../Mappers/review-mapper';
import { ReviewDto } from '../../../../common/Dtos/review.dto';
import { ReviewSummaryDto } from '../../Dtos/Reviews/Output/review-summary.dto';

@Injectable()
export class ReviewService implements IReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,

    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  async createReview(
    dto: CreateReviewDto,
    userName: string,
  ): Promise<Result<ReviewCreatedDto>> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id: dto.restaurantId },
    });

    if (!restaurant) {
      return Result.fail('restaurante no encontrado', 404);
    }

    const stars = new Stars(dto.stars);

    const review = this.reviewRepository.create({
      comment: dto.comment,
      username: userName,
      stars,
      restaurant,
    });

    const saved = await this.reviewRepository.save(review);

    return Result.ok(reviewMapper.toReviewCreatedDto(saved));
  }

  async getReviewsByRestaurant(
    restaurantId: string,
  ): Promise<Result<ReviewDto[] | []>> {
    const reviews = await this.reviewRepository.find({
      where: { restaurant: { id: restaurantId } },
      order: { createdAt: 'DESC' },
    });

    if (reviews.length < 1) {
      return Result.ok([]);
    }
    return Result.ok(reviews.map((r) => reviewMapper.toReviewDto(r)));
  }

  async getAverageStars(
    restaurantId: string,
  ): Promise<Result<ReviewSummaryDto | null>> {
    const { avg, count } = await this.reviewRepository
      .createQueryBuilder('review')
      .select('AVG(review.stars_quantity)', 'avg')
      .addSelect('COUNT(*)', 'count')
      .where('review.restaurantId = :restaurantId', { restaurantId })
      .getRawOne();

    if (count < 1) {
      return Result.ok(null);
    }
    const averageStarsValue = parseFloat(avg) || 0;
    const totalReviewsValue = parseInt(count, 10) || 0;

    const reviewSummaryDto = new ReviewSummaryDto(
      averageStarsValue,
      totalReviewsValue,
    );

    return Result.ok(reviewSummaryDto);
  }
}
