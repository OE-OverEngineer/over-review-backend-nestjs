import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  UseGuards,
  Query,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt-auth.guard';
import { Role } from 'src/infrastructure/auth/role.enum';
import { Roles } from 'src/infrastructure/auth/roles.decorator';
import { RolesGuard } from 'src/infrastructure/auth/roles.guard';
import { CreateLikeDto } from 'src/infrastructure/dto/likes/createLike.dto';
import { Pagination } from 'src/infrastructure/dto/pagination/pagination.dto';
import { CreateReviewDto } from 'src/infrastructure/dto/reviews/createReview.dto';
import { UpdateReviewDto } from 'src/infrastructure/dto/reviews/updateReview.dto';
import { LikesUseCases } from 'src/usecases/likes/likes.usecase';
import { ReviewsUseCases } from 'src/usecases/reviews/reviews.usecase';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(
    private readonly reviewsUsecases: ReviewsUseCases,
    private readonly likesUsecases: LikesUseCases,
  ) {}

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Member)
  @Post()
  create(@Body() createReviewDto: CreateReviewDto, @Request() req: any) {
    const userID = Number(req.user.id);
    return this.reviewsUsecases.create(createReviewDto, userID);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  findAll(@Query() pagintaion: Pagination) {
    return this.reviewsUsecases.findAll(pagintaion);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.reviewsUsecases.findOne(id);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Member)
  @Post('/like')
  async like(@Body() dto: CreateLikeDto, @Request() req: any) {
    const userID = Number(req.user.id);
    return this.likesUsecases.likeOrDislike(dto, userID);
    // if (dto.isLike) {
    //   return this.likesUsecases.like(dto, userID);
    // } else {
    //   return this.likesUsecases.dislike(dto, userID);
    // }
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:id')
  deleteReview(@Param('id') id: string, @Request() req) {
    const reviewId = Number(id);
    return this.reviewsUsecases.delete(reviewId, req.user);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/:id')
  updateReview(
    @Param('id') id: string,
    @Body() dto: UpdateReviewDto,
    @Request() req,
  ) {
    const reviewId = Number(id);
    return this.reviewsUsecases.update(reviewId, dto, req.user);
  }
}
