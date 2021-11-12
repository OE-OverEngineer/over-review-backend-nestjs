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
import { AuthRepository } from './auth/auth.repository';
import { LocalStrategy } from './auth/auth.strategy';
import { DatabaseCategoriesRepository } from './categories/categories.repository';
import { DatabaseDirectorsRepository } from './directors/directors.repository';
import { DatabaseMovieRepository } from './movie/movie.repository';
import { DatabaseReviewRepository } from './reviews/review.repository';
import { UsersRepository as DatabaseUsersRepository } from './users/users.repository';

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
    AuthRepository,
    LocalStrategy,
    DatabaseUsersRepository,
    DatabaseActorRepository,
    DatabaseMovieRepository,
    DatabaseDirectorsRepository,
    DatabaseReviewRepository,
    DatabaseCategoriesRepository,
  ],
  exports: [
    DatabaseUsersRepository,
    AuthRepository,
    LocalStrategy,
    DatabaseActorRepository,
    DatabaseMovieRepository,
    DatabaseDirectorsRepository,
    DatabaseReviewRepository,
    DatabaseCategoriesRepository,
  ],
})
export class RepositoriesModule {}
