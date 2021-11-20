import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILikeRepository } from 'src/domain/repositories/likeRepository.interface';
import { CreateLikeDto } from 'src/infrastructure/dto/likes/createLike.dto';
import { Like } from 'src/infrastructure/entities/like.entity';

import { Review } from 'src/infrastructure/entities/review.entity';
import { User } from 'src/infrastructure/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DatabaseLikesRepository implements ILikeRepository {
  constructor(
    @InjectRepository(Like)
    private readonly likeEntityRepository: Repository<Like>,
  ) {}
  async like(dto: CreateLikeDto, byUserID: number): Promise<number> {
    const like: Like = new Like();
    const review: Review = new Review();
    review.id = dto.targetReviewID;
    const user: User = new User();
    user.id = byUserID;
    like.review = review;
    like.byUser = user;
    await this.likeEntityRepository.save(like);
    return await this.likeEntityRepository.count({
      where: {
        review: {
          id: dto.targetReviewID,
        },
      },
    });
  }
  async disLike(dto: CreateLikeDto, byUserID: number): Promise<number> {
    const like = await this.likeEntityRepository.findOne({
      where: {
        review: {
          id: dto.targetReviewID,
        },
        byUser: {
          id: byUserID,
        },
      },
    });
    await this.likeEntityRepository.delete(like);
    return await this.likeEntityRepository.count({
      where: {
        review: {
          id: dto.targetReviewID,
        },
      },
    });
  }
}
