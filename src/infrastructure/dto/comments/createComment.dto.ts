import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsReviewFound } from 'src/infrastructure/validators/reviews/review.validator';

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.trim())
  message: string;

  @ApiProperty()
  @IsReviewFound()
  reviewID: number;
}
