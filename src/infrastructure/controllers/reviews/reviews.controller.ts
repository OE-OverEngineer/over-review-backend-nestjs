import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt-auth.guard';
import { CreateLikeDto } from 'src/infrastructure/dto/likes/createLike.dto';
import { CreateReviewDto } from 'src/infrastructure/dto/reviews/createReview.dto';
import { LikesUseCases } from 'src/usecases/likes/likes.usecase';
import { ReviewsUseCases } from 'src/usecases/reviews/reviews.usecase';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(
    private readonly reviewsUsecases: ReviewsUseCases,
    private readonly likesUsecases: LikesUseCases,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createReviewDto: CreateReviewDto, @Request() req: any) {
    const userID = Number(req.user.id);
    return this.reviewsUsecases.create(createReviewDto, userID);
  }

  @Get()
  findAll() {
    return this.reviewsUsecases.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.reviewsUsecases.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/like')
  async like(@Body() dto: CreateLikeDto, @Request() req: any) {
    const userID = Number(req.user.id);
    if (dto.isLike) {
      return this.likesUsecases.like(dto, userID);
    } else {
      return this.likesUsecases.dislike(dto, userID);
    }
  }
}
