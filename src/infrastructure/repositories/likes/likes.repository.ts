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
  async findAllByUserID(userID: number): Promise<number[]> {
    return (
      await this.likeEntityRepository.find({
        where: {
          byUser: {
            id: userID,
          },
        },
      })
    ).map((e) => e.review.id);
  }
  async findOne(targetReviewID: number, byUserID: number): Promise<Like> {
    return await this.likeEntityRepository.findOne({
      where: {
        review: {
          id: targetReviewID,
        },
        byUser: {
          id: byUserID,
        },
      },
    });
  }

  async like(dto: CreateLikeDto, byUserID: number): Promise<void> {
    /* --- Prepare new model to insert into database --- */
    const like: Like = new Like();
    const review: Review = new Review();
    review.id = dto.targetReviewID;
    const user: User = new User();
    user.id = byUserID;
    like.review = review;
    like.byUser = user;
    /* --- END Prepare new model to insert into database --- */
    await this.likeEntityRepository.save(like);
  }

  async disLike(like: Like): Promise<void> {
    // const like = await this.findOne(dto.targetReviewID, byUserID);
    await this.likeEntityRepository.delete(like);
  }
}
