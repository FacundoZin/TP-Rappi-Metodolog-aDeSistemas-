export class ReviewSummaryDto {
  averageStars: number;
  totalReviews: number;

  constructor(averageStars: number, totalReviews: number) {
    this.averageStars = averageStars;
    this.totalReviews = totalReviews;
  }
}
