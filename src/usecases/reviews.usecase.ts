import { BadRequestException } from '@nestjs/common';
import { IMovieRepository } from 'src/domain/repositories/movieRepository.interface';
import { IReviewRepository } from 'src/domain/repositories/reviewRepository.interface';
import { CreateReviewDto } from 'src/infrastructure/dto/reviews/createReview.dto';
import { UpdateReviewDto } from 'src/infrastructure/dto/reviews/updateReview.dto';
import { Review } from 'src/infrastructure/entities/review.entity';

export class ReviewsUsecase {
  constructor(
    
    private readonly movieRepository: IMovieRepository,
    private readonly reviewReository: IReviewRepository,
  ) {}

  async create(dto: CreateReviewDto, userID: number): Promise<void> {
    const movie = await this.movieRepository.findById(dto.movieID);
    if (!movie) throw new BadRequestException('Movie not found');
    await this.reviewReository.insert(dto, userID);
  }

  async update(id: number, dto: UpdateReviewDto): Promise<void> {
    await this.reviewReository.update(id, dto);
  }

  async delete(id: number): Promise<void> {
    await this.reviewReository.deleteById(id);
  }

  async findOne(id: number): Promise<Review | undefined> {
    if (id < 0) throw new BadRequestException('');
    const review = await this.reviewReository.findById(id);
    return review;
  }

  async findAll(): Promise<Review[]> {
    return await this.reviewReository.findAll();
  }
}
