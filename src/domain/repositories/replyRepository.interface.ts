import { CreateLikeDto } from 'src/infrastructure/dto/likes/createLike.dto';
import { Pagination } from 'src/infrastructure/dto/pagination/pagination.dto';
import { CreateReplyDto } from 'src/infrastructure/dto/replies/createReply.dto';
import { CreateReviewDto } from 'src/infrastructure/dto/reviews/createReview.dto';
import { UpdateReviewDto } from 'src/infrastructure/dto/reviews/updateReview.dto';
import { Reply } from 'src/infrastructure/entities/reply.entity';
import { Review } from 'src/infrastructure/entities/review.entity';

export interface IReplyRepository {
  insert(dto: CreateReplyDto, userID: number): Promise<Reply>;
  findAll(): Promise<Review[]>;
  findById(id: number): Promise<Review>;
  update(id: number, dto: UpdateReviewDto): Promise<Review>;
  deleteById(id: number): Promise<void>;
}
