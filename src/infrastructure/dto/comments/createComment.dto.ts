import { ApiProperty } from '@nestjs/swagger';
import { IsReviewFound } from 'src/infrastructure/validators/reviews/review.validator';

export class CreateCommentDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  @IsReviewFound()
  reviewID: number;
}
