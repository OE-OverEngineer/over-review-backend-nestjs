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
    console.log(7);
    console.log(!like);
    if (!like) return await this.likeRepository.like(dto, userID);
    else return await this.likeRepository.disLike(like);
  }

  async findOne(reviewID: number, userID: number): Promise<Like> {
    console.log(1);

    if (userID < 0 || reviewID < 0) throw new BadRequestException();
    console.log(2);
    const user = await this.userRepositiory.findById(userID);
    console.log(3);
    if (!user) throw new NotFoundException('user not found');
    console.log(4);
    const review = await this.reviewRepository.findById(reviewID);
    console.log(5);
    if (!review) throw new NotFoundException('review not found');
    console.log(6);
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
