import { Module } from '@nestjs/common';
import { IActorRepository } from 'src/domain/repositories/actorRepository.interface';
import { ICategoryRepository } from 'src/domain/repositories/categoriesRepository.interface';
import { IDirectorRepository } from 'src/domain/repositories/directorRepository.interface';
import { IMovieRepository } from 'src/domain/repositories/movieRepository.interface';
import { IReviewRepository } from 'src/domain/repositories/reviewRepository.interface';
import { IRoleRepository } from 'src/domain/repositories/roleRepository.interface';
import { IUsersRepository } from 'src/domain/repositories/userRepository.interface';
import { DatabaseActorRepository } from 'src/infrastructure/repositories/actors/actors.repository';
import { DatabaseCategoriesRepository } from 'src/infrastructure/repositories/categories/categories.repository';
import { DatabaseDirectorsRepository } from 'src/infrastructure/repositories/directors/directors.repository';
import { DatabaseMovieRepository } from 'src/infrastructure/repositories/movie/movie.repository';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { DatabaseReviewRepository } from 'src/infrastructure/repositories/reviews/review.repository';
import { MockRoleRepository } from 'src/infrastructure/repositories/roles/roles.mock.repositoty';
import { MockUsersRepository } from 'src/infrastructure/repositories/users/users.mock.repository';
import { DatabaseUsersRepository } from 'src/infrastructure/repositories/users/users.repository';
import { ActorsUseCases } from './actors.usecase';
import { CategoriesUseCases } from './categories.usecase';
import { DirectorsUseCases } from './directors.usecase';
import { MoviesUseCases } from './movies.usecase';
import { ReviewsUsecase } from './reviews.usecase';
import { RoleUseCases } from './roles.usecase';
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
        movieRepository: IMovieRepository,
        actorRepository: IActorRepository,
        directorRepository: IDirectorRepository,
        categoryRepository: ICategoryRepository,
        userRepository: IUsersRepository,
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
      useFactory: (repository: IActorRepository) =>
        new ActorsUseCases(repository),
    },
    {
      provide: DirectorsUseCases,
      inject: [DatabaseDirectorsRepository],
      useFactory: (repository: IDirectorRepository) =>
        new DirectorsUseCases(repository),
    },

    {
      provide: ReviewsUsecase,
      inject: [DatabaseMovieRepository, DatabaseReviewRepository],
      useFactory: (
        movieRepository: IMovieRepository,
        reviewRepository: IReviewRepository,
      ) => new ReviewsUsecase(movieRepository, reviewRepository),
    },
    {
      provide: CategoriesUseCases,
      inject: [DatabaseCategoriesRepository],
      useFactory: (repository: ICategoryRepository) =>
        new CategoriesUseCases(repository),
    },
    {
      provide: RoleUseCases,
      inject: [MockRoleRepository],
      useFactory: (repository: IRoleRepository) => new RoleUseCases(repository),
    },
  ],
  exports: [
    UsersUseCases,
    MoviesUseCases,
    ActorsUseCases,
    DirectorsUseCases,
    ReviewsUsecase,
    CategoriesUseCases,
    RoleUseCases,
  ],
})
export class UsecasesModule {}
