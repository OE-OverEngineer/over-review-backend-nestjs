import { CreateLikeDto } from 'src/infrastructure/dto/likes/createLike.dto';
import { Pagination } from 'src/infrastructure/dto/pagination/pagination.dto';
import { CreateReviewDto } from 'src/infrastructure/dto/reviews/createReview.dto';
import { UpdateReviewDto } from 'src/infrastructure/dto/reviews/updateReview.dto';
import { Review } from 'src/infrastructure/entities/review.entity';

export interface IReviewRepository {
  insert(dto: CreateReviewDto, userID: number): Promise<Review>;
  findAll(pagination: Pagination): Promise<{ data: Review[]; total: number }>;
  findMostLikesByMovieID(movieID: number): Promise<Review>;
  findAllByMovieID(
    movieID: number,
    pagination: Pagination,
  ): Promise<{ data: Review[]; total: number }>;
  findAllByUserID(
    userID: number,
    pagination: Pagination,
  ): Promise<{ data: Review[]; total: number }>;
  findById(id: number): Promise<Review>;
  findByUserIDMovieID(movieID: number, userID: number): Promise<Review>;
  update(id: number, dto: UpdateReviewDto, userID?: number): Promise<Review>;
  deleteById(id: number): Promise<void>;
}
