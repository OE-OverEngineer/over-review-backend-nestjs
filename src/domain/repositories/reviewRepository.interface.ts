import { CreateReviewDto } from 'src/infrastructure/controllers/reviews/dto/createReview.dto';
import { UpdateReviewDto } from 'src/infrastructure/controllers/reviews/dto/updateReview.dto';
import { Review } from 'src/infrastructure/entities/review.entity';

export interface IReviewRepository {
  insert(dto: CreateReviewDto, userID: number): Promise<void>;
  findAll(): Promise<Review[]>;
  // findAllByID(ids: number[]): Promise<Review[]>;
  findById(id: number): Promise<Review>;
  update(id: number, dto: UpdateReviewDto): Promise<void>;
  deleteById(id: number): Promise<void>;
}
