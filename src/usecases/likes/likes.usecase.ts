import { ILikeRepository } from 'src/domain/repositories/likeRepository.interface';
import { CreateLikeDto } from 'src/infrastructure/dto/likes/createLike.dto';

export class LikesUseCases {
  constructor(private readonly likeRepository: ILikeRepository) {}

  async like(dto: CreateLikeDto, userID: number): Promise<number> {
    return await this.likeRepository.like(dto, userID);
  }

  async dislike(dto: CreateLikeDto, userID: number): Promise<number> {
    return await this.likeRepository.disLike(dto, userID);
  }
}
