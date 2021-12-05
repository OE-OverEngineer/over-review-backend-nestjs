import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IReviewRepository } from 'src/domain/repositories/reviewRepository.interface';
import { Pagination } from 'src/infrastructure/dto/pagination/pagination.dto';
import { CreateReviewDto } from 'src/infrastructure/dto/reviews/createReview.dto';
import { UpdateReviewDto } from 'src/infrastructure/dto/reviews/updateReview.dto';

import { Movie } from 'src/infrastructure/entities/movie.entity';
import { Review } from 'src/infrastructure/entities/review.entity';
import { User } from 'src/infrastructure/entities/user.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class DatabaseReviewRepository implements IReviewRepository {
  constructor(
    @InjectRepository(Review)
    private readonly reviewEntityRepository: Repository<Review>,
  ) {}

  async findByUserIDMovieID(movieID: number, userID: number): Promise<Review> {
    return await this.reviewEntityRepository.findOne({
      where: {
        user: {
          id: userID,
        },
        movie: {
          id: movieID,
        },
      },
    });
  }

  async findAllByMovieID(
    movieID: number,
    pagination: Pagination,
  ): Promise<Review[]> {
    let sort: string | undefined;
    if (pagination.sort == 'like') sort = 'likesCount';
    // 1. Get likes and id from pagination
    const raw = await this.reviewEntityRepository
      .createQueryBuilder('review')
      .select('review.id')
      .addSelect('COUNT(likes.id)', 'likesCount')
      .leftJoin('review.likes', 'likes')
      .where('review.movie.id = :movieID', { movieID })
      .groupBy('review.id')
      .orderBy(sort)
      .take(pagination.perPage)
      .skip(pagination.pageNum - 1)
      .getRawMany();
    const ids = raw.map(({ review_id }) => review_id);

    // 2. Get all relation data
    const reviews = (
      await this.reviewEntityRepository.find({
        where: {
          id: In(ids),
        },
        relations: [
          'user',
          'comments',
          'comments.user',
          'comments.replies',
          'comments.replies.byUser',
        ],
      })
    ).map((e) => {
      return {
        ...e,
        likes: raw.find((i) => i.review_id == e.id).likesCount,
      };
    });
    return reviews;
  }
  async findAllByUserID(
    userID: number,
    pagination: Pagination,
  ): Promise<Review[]> {
    const raw = await this.reviewEntityRepository
      .createQueryBuilder('review')
      .select('review.id')
      .addSelect('COUNT(likes.id)', 'likesCount')
      .leftJoin('review.likes', 'likes')
      .where('review.user.id = :userID', { userID })
      .groupBy('review.id')
      .take(pagination.perPage)
      .skip(pagination.pageNum - 1)
      .getRawMany();
    const ids = raw.map(({ review_id }) => review_id);

    // 2. Get all relation data
    const reviews = (
      await this.reviewEntityRepository.find({
        where: {
          id: In(ids),
        },
        relations: [
          'user',
          'comments',
          'comments.user',
          'comments.reply',
          'comments.reply.byUser',
          'movie',
          'movie.director',
          'movie.actors',
          'movie.categories',
        ],
      })
    ).map((e) => {
      // add likes from 1st query to this
      const review: Review = {
        ...e,
        likes: raw.find((i) => i.review_id == e.id).likesCount,
      };
      return review;
    });
    return reviews;
  }

  async update(id: number, dto: UpdateReviewDto): Promise<Review> {
    // await this.reviewEntityRepository.update({ id: id }, { ...dto });
    return await this.reviewEntityRepository.findOne(id);
  }

  async insert(dto: CreateReviewDto, id: number): Promise<Review> {
    const review: Review = this.dtoToReview(dto, id);
    await this.reviewEntityRepository.save(review);
    return await this.reviewEntityRepository.findOne(id);
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

    return await this.reviewEntityRepository.find({
      relations: ['movie'],
    });
    // relations: [],
  }

  async findById(id: number): Promise<Review | undefined> {
    // const score = await this.reviewEntityRepository
    //   .createQueryBuilder('movie')
    //   .select('movie')
    //   // .addSelect('AVG(reviews.score)', 'score')
    //   // .leftJoin('movie.reviews', 'reviews')
    //   // .groupBy('movie.id')
    //   // .where('movie.id = :id', { id: id })
    //   .getRawOne();
    // console.log(score);
    /// ANCHOR : Need to sort by comment.createdAt
    const movie = await this.reviewEntityRepository.findOne({
      where: { id },
      relations: [
        'user',
        'comments',
        'comments.user',
        'comments.replies',
        'comments.replies.byUser',
        'movie',
      ],
      // order: { comments: 'DESC' },
    });
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
    const review: Review = new Review();
    review.message = dto.message;
    review.score = dto.score;
    review.movie = movie;
    review.user = user;
    // const review: Review = {
    //   ...dto,
    //   user: user,
    //   movie: movie,
    // };
    return review;
  }
}
