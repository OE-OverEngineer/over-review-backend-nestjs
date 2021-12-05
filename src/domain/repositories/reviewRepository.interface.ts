import { CreateLikeDto } from 'src/infrastructure/dto/likes/createLike.dto';
import { Pagination } from 'src/infrastructure/dto/pagination/pagination.dto';
import { CreateReviewDto } from 'src/infrastructure/dto/reviews/createReview.dto';
import { UpdateReviewDto } from 'src/infrastructure/dto/reviews/updateReview.dto';
import { Review } from 'src/infrastructure/entities/review.entity';

export interface IReviewRepository {
  insert(dto: CreateReviewDto, userID: number): Promise<Review>;
  findAll(): Promise<Review[]>;
  findAllByMovieID(movieID: number, pagination: Pagination): Promise<Review[]>;
  findAllByUserID(userID: number, pagination: Pagination): Promise<Review[]>;
  findById(id: number): Promise<Review>;
  findByUserIDMovieID(movieID: number, userID: number): Promise<Review>;
  update(id: number, dto: UpdateReviewDto): Promise<Review>;
  deleteById(id: number): Promise<void>;
}
