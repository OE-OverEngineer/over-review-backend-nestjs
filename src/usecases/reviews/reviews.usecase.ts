import { ConflictException, ForbiddenException } from '@nestjs/common';
import { IReviewRepository } from 'src/domain/repositories/reviewRepository.interface';
import { JwtData } from 'src/infrastructure/auth/jwt.interface';
import { Pagination } from 'src/infrastructure/dto/pagination/pagination.dto';
import { CreateReviewDto } from 'src/infrastructure/dto/reviews/createReview.dto';
import { UpdateReviewDto } from 'src/infrastructure/dto/reviews/updateReview.dto';
import { Review } from 'src/infrastructure/entities/review.entity';
import { User } from 'src/infrastructure/entities/user.entity';

export class ReviewsUseCases {
  constructor(private readonly reviewReository: IReviewRepository) {}

  async create(dto: CreateReviewDto, userID: number): Promise<Review> {
    console.log(dto);
    const review = await this.reviewReository.findByUserIDMovieID(
      dto.movieID,
      userID,
    );
    console.log(userID);
    if (review) throw new ConflictException();
    return await this.reviewReository.insert(dto, userID);
  }

  async update(id: number, dto: UpdateReviewDto): Promise<void> {
    await this.reviewReository.update(id, dto);
  }

  async delete(id: number, user: JwtData): Promise<void> {
    const review = await this.findOne(id);
    if (user.role === 'admin' || review.user.id === user.id)
      await this.reviewReository.deleteById(id);
    throw new ForbiddenException();
  }

  async findOne(id: number): Promise<Review | undefined> {
    const review = await this.reviewReository.findById(id);
    return review;
  }

  async findAll(
    pagination: Pagination,
  ): Promise<{ data: Review[]; total: number }> {
    return await this.reviewReository.findAll(pagination);
  }

  async findAllByMovieID(
    movieID: number,
    pagination: Pagination,
  ): Promise<{ data: Review[]; total: number }> {
    // if (pagination.)
    return await this.reviewReository.findAllByMovieID(movieID, pagination);
  }

  async findAllByUserID(
    userID: number,
    pagination: Pagination,
  ): Promise<{ data: Review[]; total: number }> {
    // if (pagination.)
    return await this.reviewReository.findAllByUserID(userID, pagination);
  }
}
