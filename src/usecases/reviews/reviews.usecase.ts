import { ConflictException } from '@nestjs/common';
import { IReviewRepository } from 'src/domain/repositories/reviewRepository.interface';
import { Pagination } from 'src/infrastructure/dto/pagination/pagination.dto';
import { CreateReviewDto } from 'src/infrastructure/dto/reviews/createReview.dto';
import { UpdateReviewDto } from 'src/infrastructure/dto/reviews/updateReview.dto';
import { Review } from 'src/infrastructure/entities/review.entity';

export class ReviewsUseCases {
  constructor(private readonly reviewReository: IReviewRepository) {}

  async create(dto: CreateReviewDto, userID: number): Promise<Review> {
    const review = await this.reviewReository.findByUserIDMovieID(
      dto.movieID,
      userID,
    );
    if (review) throw new ConflictException();
    return await this.reviewReository.insert(dto, userID);
  }

  async update(id: number, dto: UpdateReviewDto): Promise<void> {
    await this.reviewReository.update(id, dto);
  }

  async delete(id: number): Promise<void> {
    await this.reviewReository.deleteById(id);
  }

  async findOne(id: number): Promise<Review | undefined> {
    const review = await this.reviewReository.findById(id);
    return review;
  }

  async findAll(): Promise<Review[]> {
    return await this.reviewReository.findAll();
  }

  async findAllByMovieID(
    movieID: number,
    pagination: Pagination,
  ): Promise<Review[]> {
    // if (pagination.)
    return await this.reviewReository.findAllByMovieID(movieID, pagination);
  }

  async findAllByUserID(
    userID: number,
    pagination: Pagination,
  ): Promise<Review[]> {
    // if (pagination.)
    return await this.reviewReository.findAllByUserID(userID, pagination);
  }
}
