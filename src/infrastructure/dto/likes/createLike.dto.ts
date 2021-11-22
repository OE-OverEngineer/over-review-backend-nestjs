import { ApiProperty } from '@nestjs/swagger';

export class CreateLikeDto {
  @ApiProperty()
  targetReviewID: number;

  @ApiProperty()
  isLike: boolean;
}
