import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateReviewDto } from 'src/infrastructure/dto/reviews/createReview.dto';
import { ReviewsUsecase } from 'src/usecases/reviews/reviews.usecase';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsUsecases: ReviewsUsecase) {}
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
}
