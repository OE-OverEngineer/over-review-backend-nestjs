import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateLikeDto } from 'src/infrastructure/dto/likes/createLike.dto';
import { CreateReviewDto } from 'src/infrastructure/dto/reviews/createReview.dto';
import { LikesUseCases } from 'src/usecases/likes/likes.usecase';
import { ReviewsUseCases } from 'src/usecases/reviews/reviews.usecase';

@Controller('reviews')
export class ReviewsController {
  constructor(
    private readonly reviewsUsecases: ReviewsUseCases,
    private readonly likesUsecases: LikesUseCases,
  ) {}
  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    const id = 1;
    return this.reviewsUsecases.create(createReviewDto, id);
  }

  @Get()
  findAll() {
    return this.reviewsUsecases.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.reviewsUsecases.findOne(id);
  }
  @Post('/like')
  async like(@Body() dto: CreateLikeDto) {
    const userID = 1;
    return this.likesUsecases.like(dto, userID);
  }
}
