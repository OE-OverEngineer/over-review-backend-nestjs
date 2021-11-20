import { Module } from '@nestjs/common';
import { IActorRepository } from 'src/domain/repositories/actorRepository.interface';
import { ICategoryRepository } from 'src/domain/repositories/categoriesRepository.interface';
import { ICommentRepository } from 'src/domain/repositories/commentRepository.interface';
import { IDirectorRepository } from 'src/domain/repositories/directorRepository.interface';
import { ILikeRepository } from 'src/domain/repositories/likeRepository.interface';
import { IMovieRepository } from 'src/domain/repositories/movieRepository.interface';
import { IReviewRepository } from 'src/domain/repositories/reviewRepository.interface';
import { IRoleRepository } from 'src/domain/repositories/roleRepository.interface';
import { IUsersRepository } from 'src/domain/repositories/userRepository.interface';
import { DatabaseActorsRepository } from 'src/infrastructure/repositories/actors/actors.repository';
import { DatabaseCategoriesRepository } from 'src/infrastructure/repositories/categories/categories.repository';
import { DatabaseCommentsRepository } from 'src/infrastructure/repositories/comments/comments.repository';
import { DatabaseDirectorsRepository } from 'src/infrastructure/repositories/directors/directors.repository';
import { DatabaseLikesRepository } from 'src/infrastructure/repositories/likes/likes.repository';
import { DatabaseMovieRepository } from 'src/infrastructure/repositories/movie/movie.repository';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { DatabaseReviewRepository } from 'src/infrastructure/repositories/reviews/review.repository';
import { MockRoleRepository } from 'src/infrastructure/repositories/roles/roles.mock.repositoty';
import { DatabaseUsersRepository } from 'src/infrastructure/repositories/users/users.repository';
import { ActorsUseCases } from './actors/actors.usecase';
import { CategoriesUseCases } from './categories/categories.usecase';
import { CommentsUseCases } from './comments/comments.usecase';
import { DirectorsUseCases } from './directors/directors.usecase';
import { LikesUsecase } from './likes/likes.usecase';
import { MoviesUseCases } from './movies/movies.usecase';
import { ReviewsUsecase } from './reviews/reviews.usecase';
import { RolesUseCases } from './roles/roles.usecase';
import { UsersUseCases } from './users/users.usecase';

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
      inject: [DatabaseMovieRepository, DatabaseUsersRepository],
      useFactory: (
        movieRepository: IMovieRepository,
        userRepository: IUsersRepository,
      ) => new MoviesUseCases(movieRepository, userRepository),
    },
    {
      provide: ActorsUseCases,
      inject: [DatabaseActorsRepository],
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
      inject: [DatabaseReviewRepository],
      useFactory: (reviewRepository: IReviewRepository) =>
        new ReviewsUsecase(reviewRepository),
    },
    {
      provide: CategoriesUseCases,
      inject: [DatabaseCategoriesRepository],
      useFactory: (repository: ICategoryRepository) =>
        new CategoriesUseCases(repository),
    },
    {
      provide: RolesUseCases,
      inject: [MockRoleRepository],
      useFactory: (repository: IRoleRepository) =>
        new RolesUseCases(repository),
    },
    {
      provide: CommentsUseCases,
      inject: [DatabaseCommentsRepository],
      useFactory: (repository: ICommentRepository) =>
        new CommentsUseCases(repository),
    },
    {
      provide: LikesUsecase,
      inject: [DatabaseLikesRepository],
      useFactory: (repository: ILikeRepository) => new LikesUsecase(repository),
    },
  ],
  exports: [
    UsersUseCases,
    MoviesUseCases,
    CommentsUseCases,
    ActorsUseCases,
    DirectorsUseCases,
    ReviewsUsecase,
    CategoriesUseCases,
    RolesUseCases,
    LikesUsecase,
  ],
})
export class UsecasesModule {}
