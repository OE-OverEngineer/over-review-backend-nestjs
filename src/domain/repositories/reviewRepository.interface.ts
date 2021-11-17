import { CreateReviewDto } from 'src/infrastructure/dto/reviews/createReview.dto';
import { UpdateReviewDto } from 'src/infrastructure/dto/reviews/updateReview.dto';
import { Review } from 'src/infrastructure/entities/review.entity';

export interface IReviewRepository {
  insert(dto: CreateReviewDto, userID: number): Promise<Review>;
  findAll(): Promise<Review[]>;
  // findAllByID(ids: number[]): Promise<Review[]>;
  findById(id: number): Promise<Review>;
  update(id: number, dto: UpdateReviewDto): Promise<Review>;
  deleteById(id: number): Promise<void>;
}
