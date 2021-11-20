import { ApiProperty } from '@nestjs/swagger';
import { IsReviewFound } from 'src/infrastructure/validators/reviews/review.validator';

export class CreateLikeDto {
  // @IsReviewFound()
  @ApiProperty()
  targetReviewID: number;
}
