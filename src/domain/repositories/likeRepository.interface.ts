import { CreateLikeDto } from 'src/infrastructure/dto/likes/createLike.dto';

export interface ILikeRepository {
  like(dto: CreateLikeDto, byUserID: number): Promise<number>;
  disLike(dto: CreateLikeDto, byUserID: number): Promise<number>;
}
