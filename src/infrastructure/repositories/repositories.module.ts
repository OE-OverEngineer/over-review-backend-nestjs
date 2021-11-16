import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from '../entities/actor.entity';
import { Category } from '../entities/category.entity';
import { Comment } from '../entities/comment.entity';
import { Director } from '../entities/director.entity';
import { Movie } from '../entities/movie.entity';
import { Report } from '../entities/report.entity';
import { Review } from '../entities/review.entity';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import { DatabaseActorRepository } from './actors/actors.repository';
import { DatabaseCategoriesRepository } from './categories/categories.repository';
import { DatabaseDirectorsRepository } from './directors/directors.repository';
import { DatabaseMovieRepository } from './movie/movie.repository';
import { DatabaseReviewRepository } from './reviews/review.repository';
import { MockUsersRepository } from './users/users.mock.repository';
import { DatabaseUsersRepository } from './users/users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Actor,
      Comment,
      Director,
      Movie,
      Report,
      Review,
      Role,
      User,
      Category,
    ]),
  ],
  providers: [
    DatabaseUsersRepository,
    DatabaseActorRepository,
    DatabaseMovieRepository,
    DatabaseDirectorsRepository,
    DatabaseReviewRepository,
    DatabaseCategoriesRepository,
    MockUsersRepository,
  ],
  exports: [
    DatabaseUsersRepository,
    DatabaseActorRepository,
    DatabaseMovieRepository,
    DatabaseDirectorsRepository,
    DatabaseReviewRepository,
    DatabaseCategoriesRepository,
    MockUsersRepository,
  ],
})
export class RepositoriesModule {}
