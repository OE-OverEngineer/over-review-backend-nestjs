import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ILikeRepository } from 'src/domain/repositories/likeRepository.interface';
import { IReviewRepository } from 'src/domain/repositories/reviewRepository.interface';
import { IUsersRepository } from 'src/domain/repositories/userRepository.interface';
import { CreateLikeDto } from 'src/infrastructure/dto/likes/createLike.dto';
import { Like } from 'src/infrastructure/entities/like.entity';

export class LikesUseCases {
  constructor(
    private readonly likeRepository: ILikeRepository,
    private readonly reviewRepository: IReviewRepository,
    private readonly userRepositiory: IUsersRepository,
  ) {}

  async likeOrDislike(dto: CreateLikeDto, userID: number): Promise<void> {
    const like = await this.findOne(dto.targetReviewID, userID);
    if (!like) return await this.likeRepository.like(dto, userID);
    else return await this.likeRepository.disLike(like);
  }

  async findOne(reviewID: number, userID: number): Promise<Like> {
    if (userID < 0 || reviewID < 0) throw new BadRequestException();
    const user = await this.userRepositiory.findById(userID);
    if (!user) throw new NotFoundException('user not found');
    const review = await this.reviewRepository.findById(reviewID);
    if (!review) throw new NotFoundException('review not found');
    return await this.likeRepository.findOne(reviewID, userID);
  }
  async findLikeByUserID(userID: number): Promise<number[]> {
    return await this.likeRepository.findAllByUserID(userID);
  }

  // async dislike(dto: CreateLikeDto, userID: number): Promise<void> {
  //   const like = await this.likeRepository.findOne(dto.targetReviewID, userID);
  //   if (!like) throw new BadRequestException();
  //   return await this.likeRepository.disLike(like);
  // }
}
