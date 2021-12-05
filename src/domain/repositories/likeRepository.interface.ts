import { CreateLikeDto } from 'src/infrastructure/dto/likes/createLike.dto';
import { Like } from 'src/infrastructure/entities/like.entity';

export interface ILikeRepository {
  findOne(targetReviewID: number, byUserID: number): Promise<Like>;
  findAllByUserID(userID: number): Promise<number[]>;
  like(dto: CreateLikeDto, byUserID: number): Promise<void>;
  disLike(like: Like): Promise<void>;
}
