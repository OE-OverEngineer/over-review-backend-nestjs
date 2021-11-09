import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty()
  movieID: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  score: number;
}
