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
  async findMostLikesByMovieID(movieID: number): Promise<Review> {
    const data = await this.reviewEntityRepository.findOne({
      where: {
        movie: {
          id: movieID,
        },
      },
      relations: [
        'user',
        'comments',
        'comments.user',
        'comments.replies',
        'comments.replies.byUser',
      ],
      order: {
        likesCount: 'DESC',
        createdAt: 'DESC',
      },
    });
    return data;
  }

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
  ): Promise<{ data: Review[]; total: number }> {
    const skip = (pagination.pageNum - 1) * pagination.perPage;
    const [data, total] = await this.reviewEntityRepository.findAndCount({
      where: {
        movie: {
          id: movieID,
        },
      },
      relations: [
        'user',
        'comments',
        'comments.user',
        'comments.replies',
        'comments.replies.byUser',
      ],
      take: pagination.perPage,
      skip: skip,
      order: {
        createdAt: 'DESC',
      },
    });
    data.forEach((review, idx) => {
      data[idx].comments = data[idx].comments.sort((a, b) =>
        a.createdAt > b.createdAt ? 1 : -1,
      );
    });

    data.forEach((review) => {
      if (review.comments) {
        review.comments.forEach((comment) => {
          comment.replies = comment.replies.sort((a, b) =>
            a.createdAt > b.createdAt ? 1 : -1,
          );
        });
      }
    });
    return { data, total };
  }
  async findAllByUserID(
    userID: number,
    pagination: Pagination,
  ): Promise<{ data: Review[]; total: number }> {
    const skip = (pagination.pageNum - 1) * pagination.perPage;
    // const raw = await this.reviewEntityRepository
    //   .createQueryBuilder('review')
    //   .select('review.id')
    //   .addSelect('COUNT(likes.id)', 'likesCount')
    //   .leftJoin('review.likes', 'likes')
    //   .where('review.user.id = :userID', { userID })
    //   .groupBy('review.id')
    //   .take(pagination.perPage)
    //   .skip(pagination.pageNum - 1)
    //   .getRawMany();
    // const ids = raw.map(({ review_id }) => review_id);

    // 2. Get all relation data
    const [data, total] = await this.reviewEntityRepository.findAndCount({
      where: {
        // id: In(ids),
        user: {
          id: userID,
        },
      },
      relations: [
        'user',
        'comments',
        'comments.user',
        'comments.replies',
        'comments.replies.byUser',
        'movie',
        'movie.director',
        'movie.actors',
        'movie.categories',
      ],
      take: pagination.perPage,
      skip: skip,
    });
    return { data, total };
  }

  async update(
    id: number,
    dto: UpdateReviewDto,
    userID?: number,
  ): Promise<Review> {
    const review: Review = this.dtoToReview(dto, userID);
    review.id = id;
    return await this.reviewEntityRepository.save(review);
  }

  async insert(dto: CreateReviewDto, userID: number): Promise<Review> {
    const review: Review = this.dtoToReview(dto, userID);

    const revieww = await this.reviewEntityRepository.save(review);
    return revieww;
  }

  async findAll(
    pagination: Pagination,
  ): Promise<{ data: Review[]; total: number }> {
    const skip = (pagination.pageNum - 1) * pagination.perPage;
    const [data, total] = await this.reviewEntityRepository.findAndCount({
      relations: ['movie'],
      skip: skip,
      take: pagination.perPage,
    });
    return { data, total };
  }

  async findById(id: number): Promise<Review> {
    const review = await this.reviewEntityRepository.findOne({
      where: { id },
      relations: [
        'user',
        'comments',
        'comments.user',
        'comments.replies',
        'comments.replies.byUser',
        'movie',
      ],
    });
    //data.forEach((review, idx) => {
    review.comments = review.comments.sort((a, b) =>
      a.createdAt > b.createdAt ? 1 : -1,
    );
    // });
    if (review.comments) {
      review.comments.forEach((comment, idx) => {
        comment.replies = comment.replies.sort((a, b) =>
          a.createdAt > b.createdAt ? 1 : -1,
        );
      });
    }
    // movie.score = score;
    return review;
  }

  async deleteById(id: number): Promise<void> {
    await this.reviewEntityRepository.delete(id);
  }

  private dtoToReview(
    dto: CreateReviewDto | UpdateReviewDto,
    userID: number,
  ): Review {
    const movie: Movie = new Movie();
    movie.id = dto.movieID;
    const user: User = new User();
    user.id = userID;
    const review: Review = new Review();
    review.message = dto.message;
    review.score = dto.score;
    review.movie = movie;
    if (userID) review.user = user;
    return review;
  }
}
