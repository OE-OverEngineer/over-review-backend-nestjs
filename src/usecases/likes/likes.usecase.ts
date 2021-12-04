import { BadRequestException } from '@nestjs/common';
import { ILikeRepository } from 'src/domain/repositories/likeRepository.interface';
import { CreateLikeDto } from 'src/infrastructure/dto/likes/createLike.dto';

export class LikesUseCases {
  constructor(private readonly likeRepository: ILikeRepository) {}

  async like(dto: CreateLikeDto, userID: number): Promise<void> {
    return await this.likeRepository.like(dto, userID);
  }

  async dislike(dto: CreateLikeDto, userID: number): Promise<void> {
    const like = await this.likeRepository.findOne(dto.targetReviewID, userID);
    if (!like) throw new BadRequestException();
    return await this.likeRepository.disLike(like);
  }
}
