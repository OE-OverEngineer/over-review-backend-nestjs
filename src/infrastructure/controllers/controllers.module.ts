import { Module } from '@nestjs/common';
import { UsersUseCases } from 'src/usecases/users.usecase';
import { RepositoriesModule } from '../repositories/repositories.module';
import { DatabaseUsersRepository } from '../repositories/users/users.repository';
import { MoviesController } from './movies/movies.controller';
import { UsersController } from './users/users.controller';
import { ActorsController } from './actors/actors.controller';
import { DirectorsController } from './directors/directors.controller';
import { MoviesUseCases } from 'src/usecases/movies.usecase';
import { DatabaseMovieRepository } from '../repositories/movie/movie.repository';
import { DatabaseActorRepository } from '../repositories/actors/actors.repository';
import { DatabaseDirectorsRepository } from '../repositories/directors/directors.repository';
import { ActorsUseCases } from 'src/usecases/actors.usecase';
import { DirectorsUseCases } from 'src/usecases/directors.usecase';
import { ReviewsController } from './reviews/reviews.controller';
import { ReviewsUsecase } from 'src/usecases/reviews.usecase';
import { DatabaseReviewRepository } from '../repositories/reviews/review.repository';
import { AuthModule } from '../auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { CategoriesUseCases } from 'src/usecases/categories.usecase';
import { DatabaseCategoriesRepository } from '../repositories/categories/categories.repository';
import { CategoriesController } from './category/categories.controller';
import { IsUserEmailAlreadyExist } from '../validators/user/user.validator';
import { ValidatorModule } from '../validators/validator.module';
// import { ValidatorModule } from '../validators/validator.module';

@Module({
  imports: [RepositoriesModule, AuthModule, ValidatorModule],
  controllers: [
    UsersController,
    MoviesController,
    ActorsController,
    DirectorsController,
    ReviewsController,
    AuthController,
    CategoriesController,
  ],

  providers: [
    {
      provide: UsersUseCases,
      inject: [DatabaseUsersRepository],
      useFactory: (repository: DatabaseUsersRepository) =>
        new UsersUseCases(repository),
    },

    {
      provide: MoviesUseCases,
      inject: [
        DatabaseMovieRepository,
        DatabaseActorRepository,
        DatabaseDirectorsRepository,
        DatabaseCategoriesRepository,
        DatabaseUsersRepository,
      ],
      useFactory: (
        movieRepository: DatabaseMovieRepository,
        actorRepository: DatabaseActorRepository,
        directorRepository: DatabaseDirectorsRepository,
        categoryRepository: DatabaseCategoriesRepository,
        userRepository: DatabaseUsersRepository,
      ) =>
        new MoviesUseCases(
          movieRepository,
          actorRepository,
          directorRepository,
          categoryRepository,
          userRepository,
        ),
    },
    {
      provide: ActorsUseCases,
      inject: [DatabaseActorRepository],
      useFactory: (repository: DatabaseActorRepository) =>
        new ActorsUseCases(repository),
    },
    {
      provide: DirectorsUseCases,
      inject: [DatabaseDirectorsRepository],
      useFactory: (repository: DatabaseDirectorsRepository) =>
        new DirectorsUseCases(repository),
    },

    {
      provide: ReviewsUsecase,
      inject: [DatabaseMovieRepository, DatabaseReviewRepository],
      useFactory: (
        movieRepository: DatabaseMovieRepository,
        reviewRepository: DatabaseReviewRepository,
      ) => new ReviewsUsecase(movieRepository, reviewRepository),
    },
    {
      provide: CategoriesUseCases,
      inject: [DatabaseCategoriesRepository],
      useFactory: (repository: DatabaseCategoriesRepository) =>
        new CategoriesUseCases(repository),
    },
  ],
})
export class ControllersModule {}
