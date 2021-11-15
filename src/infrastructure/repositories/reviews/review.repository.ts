import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IReviewRepository } from 'src/domain/repositories/reviewRepository.interface';
import { CreateReviewDto } from 'src/infrastructure/controllers/reviews/dto/createReview.dto';
import { UpdateReviewDto } from 'src/infrastructure/controllers/reviews/dto/updateReview.dto';

import { Movie } from 'src/infrastructure/entities/movie.entity';
import { Review } from 'src/infrastructure/entities/review.entity';
import { User } from 'src/infrastructure/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DatabaseReviewRepository implements IReviewRepository {
  constructor(
    @InjectRepository(Review)
    private readonly reviewEntityRepository: Repository<Review>,
  ) {}

  async update(id: number, dto: UpdateReviewDto): Promise<void> {
    await this.reviewEntityRepository.update({ id: id }, { ...dto });
  }

  async insert(dto: CreateReviewDto, id: number): Promise<void> {
    const movie: Review = this.dtoToReview(dto, id);
    await this.reviewEntityRepository.save(movie);
  }

  async findAll(): Promise<Review[]> {
    // const [score] = await this.movieEntityRepository
    // const score = await this.reviewEntityRepository
    //   .createQueryBuilder('movie')
    //   .select('AVG(reviews.score)', 'score')
    //   .leftJoin('movie.reviews', 'reviews')
    //   .groupBy('movie.id')
    //   .getRawMany();
    // console.log(score);
    // return
    return this.reviewEntityRepository.find({
      // relations: [],
    });
  }

  async findById(id: number): Promise<Review | undefined> {
    const score = await this.reviewEntityRepository
      .createQueryBuilder('movie')
      .select('movie')
      // .addSelect('AVG(reviews.score)', 'score')
      // .leftJoin('movie.reviews', 'reviews')
      // .groupBy('movie.id')
      // .where('movie.id = :id', { id: id })
      .getRawOne();
    console.log(score);
    const movie = await this.reviewEntityRepository.findOne({ id });
    // movie.score = score;
    return movie;
  }

  async deleteById(id: number): Promise<void> {
    await this.reviewEntityRepository.delete(id);
  }

  private dtoToReview(dto: CreateReviewDto, id: number): Review {
    const movie: Movie = new Movie();
    movie.id = dto.movieID;
    const user: User = new User();
    user.id = id;
    const review: Review = {
      ...dto,
      user: user,
      movie: movie,
    };
    return review;
  }
}
