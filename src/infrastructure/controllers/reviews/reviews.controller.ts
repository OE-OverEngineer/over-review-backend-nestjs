import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ReviewsUsecase } from 'src/usecases/reviews.usecase';
import { CreateReviewDto } from './dto/createReview.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsUsecases: ReviewsUsecase) {}
  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    const id = 8;
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
