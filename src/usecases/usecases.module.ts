import { Module } from '@nestjs/common';
import { IActorRepository } from 'src/domain/repositories/actorRepository.interface';
import { ICategoryRepository } from 'src/domain/repositories/categoriesRepository.interface';
import { ICommentRepository } from 'src/domain/repositories/commentRepository.interface';
import { IDirectorRepository } from 'src/domain/repositories/directorRepository.interface';
import { ILikeRepository } from 'src/domain/repositories/likeRepository.interface';
import { IMovieRepository } from 'src/domain/repositories/movieRepository.interface';
import { IReportRepository } from 'src/domain/repositories/reportRepository.interface';
import { IReviewRepository } from 'src/domain/repositories/reviewRepository.interface';
import { IRoleRepository } from 'src/domain/repositories/roleRepository.interface';
import { IUsersRepository } from 'src/domain/repositories/userRepository.interface';
import { DatabaseCategoryRepository } from 'src/infrastructure/repositories/categories/categories.repository';
import { DatabaseActorsRepository } from 'src/infrastructure/repositories/actors/actors.repository';
import { DatabaseCommentsRepository } from 'src/infrastructure/repositories/comments/comments.repository';
import { DatabaseDirectorsRepository } from 'src/infrastructure/repositories/directors/directors.repository';
import { DatabaseLikesRepository } from 'src/infrastructure/repositories/likes/likes.repository';
import { DatabaseMovieRepository } from 'src/infrastructure/repositories/movie/movie.repository';
import { DatabaseReportRepository } from 'src/infrastructure/repositories/reports/reports.repository';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { DatabaseReviewRepository } from 'src/infrastructure/repositories/reviews/review.repository';
import { DatabaseUsersRepository } from 'src/infrastructure/repositories/users/users.repository';
import { ActorsUseCases } from './actors/actors.usecase';
import { CategoriesUseCases } from './categories/categories.usecase';
import { CommentsUseCases } from './comments/comments.usecase';
import { DirectorsUseCases } from './directors/directors.usecase';
import { LikesUseCases } from './likes/likes.usecase';
import { MoviesUseCases } from './movies/movies.usecase';
import { ReportsUsecase } from './reports/reports.usecase';
import { ReviewsUseCases } from './reviews/reviews.usecase';
import { RolesUseCases } from './roles/roles.usecase';
import { UsersUseCases } from './users/users.usecase';
import { StorageService } from 'src/infrastructure/storage/storage.service';
import { StorageModule } from 'src/infrastructure/storage/storage.module';
import { RepliesUsecase } from './replies/replies.usecase';
import { IReplyRepository } from 'src/domain/repositories/replyRepository.interface copy';
import { DatabaseRepliesRepository } from 'src/infrastructure/repositories/replies/replies.repository';
import { DatabaseRolesRepository } from 'src/infrastructure/repositories/roles/roles.repository';

@Module({
  imports: [RepositoriesModule, StorageModule],
  providers: [
    {
      provide: UsersUseCases,
      inject: [DatabaseUsersRepository, StorageService],
      useFactory: (repository: IUsersRepository, storage: StorageService) =>
        new UsersUseCases(repository, storage),
    },
    {
      provide: MoviesUseCases,
      inject: [
        DatabaseMovieRepository,
        DatabaseUsersRepository,
        StorageService,
      ],
      useFactory: (
        movieRepository: IMovieRepository,
        userRepository: IUsersRepository,
        storageService: StorageService,
      ) => new MoviesUseCases(movieRepository, userRepository, storageService),
    },
    {
      provide: ActorsUseCases,
      inject: [DatabaseActorsRepository, StorageService],
      useFactory: (
        repository: IActorRepository,
        storageService: StorageService,
      ) => new ActorsUseCases(repository, storageService),
    },
    {
      provide: DirectorsUseCases,
      inject: [DatabaseDirectorsRepository],
      useFactory: (repository: IDirectorRepository) =>
        new DirectorsUseCases(repository),
    },
    {
      provide: ReviewsUseCases,
      inject: [DatabaseReviewRepository],
      useFactory: (reviewRepository: IReviewRepository) =>
        new ReviewsUseCases(reviewRepository),
    },
    {
      provide: CategoriesUseCases,
      inject: [DatabaseCategoryRepository],
      useFactory: (repository: ICategoryRepository) =>
        new CategoriesUseCases(repository),
    },
    {
      provide: RolesUseCases,
      inject: [DatabaseRolesRepository],
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
      provide: RepliesUsecase,
      inject: [DatabaseRepliesRepository],
      useFactory: (repository: IReplyRepository) =>
        new RepliesUsecase(repository),
    },
    {
      provide: LikesUseCases,
      inject: [DatabaseLikesRepository],
      useFactory: (repository: ILikeRepository) =>
        new LikesUseCases(repository),
    },
    {
      provide: ReportsUsecase,
      inject: [DatabaseReportRepository],
      useFactory: (repository: IReportRepository) =>
        new ReportsUsecase(repository),
    },
  ],
  exports: [
    UsersUseCases,
    MoviesUseCases,
    CommentsUseCases,
    ActorsUseCases,
    DirectorsUseCases,
    ReviewsUseCases,
    CategoriesUseCases,
    RolesUseCases,
    LikesUseCases,
    ReportsUsecase,
    RepliesUsecase,
  ],
})
export class UsecasesModule {}
