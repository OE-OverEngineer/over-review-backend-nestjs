import { Module } from '@nestjs/common';
import { IUsersRepository } from 'src/domain/repositories/userRepository.interface';
import { DatabaseActorRepository } from 'src/infrastructure/repositories/actors/actors.repository';
import { DatabaseCategoriesRepository } from 'src/infrastructure/repositories/categories/categories.repository';
import { DatabaseDirectorsRepository } from 'src/infrastructure/repositories/directors/directors.repository';
import { DatabaseMovieRepository } from 'src/infrastructure/repositories/movie/movie.repository';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { DatabaseReviewRepository } from 'src/infrastructure/repositories/reviews/review.repository';
import { MockUsersRepository } from 'src/infrastructure/repositories/users/users.mock.repository';
import { DatabaseUsersRepository } from 'src/infrastructure/repositories/users/users.repository';
import { ActorsUseCases } from './actors.usecase';
import { CategoriesUseCases } from './categories.usecase';
import { DirectorsUseCases } from './directors.usecase';
import { MoviesUseCases } from './movies.usecase';
import { ReviewsUsecase } from './reviews.usecase';
import { UsersUseCases } from './users.usecase';

@Module({
  imports: [RepositoriesModule],
  providers: [
    {
      provide: UsersUseCases,
      inject: [DatabaseUsersRepository],
      useFactory: (repository: IUsersRepository) =>
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
  exports: [
    UsersUseCases,
    MoviesUseCases,
    ActorsUseCases,
    DirectorsUseCases,
    ReviewsUsecase,
    CategoriesUseCases,
  ],
})
export class UsecasesModule {}
