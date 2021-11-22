import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max, Min } from 'class-validator';
import { IsMovieFound } from 'src/infrastructure/validators/movies/movie.validator';

export class CreateReviewDto {
  @ApiProperty()
  @IsMovieFound()
  movieID: number;

  @IsString()
  @ApiProperty()
  message: string;

  @IsNumber()
  @Max(10)
  @Min(0)
  @ApiProperty()
  score: number;
}
