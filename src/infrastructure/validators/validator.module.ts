import { Module } from '@nestjs/common';
import { ActorsUseCases } from 'src/usecases/actors/actors.usecase';
import { CategoriesUseCases } from 'src/usecases/categories/categories.usecase';
import { CommentsUseCases } from 'src/usecases/comments/comments.usecase';
import { DirectorsUseCases } from 'src/usecases/directors/directors.usecase';
import { MoviesUseCases } from 'src/usecases/movies/movies.usecase';
import { ReviewsUseCases } from 'src/usecases/reviews/reviews.usecase';
import { RolesUseCases } from 'src/usecases/roles/roles.usecase';

import { UsecasesModule } from 'src/usecases/usecases.module';
import { UsersUseCases } from 'src/usecases/users/users.usecase';
import {
  IsActorFoundConstraint,
  IsActorListFoundConstraint,
} from './actors/actors.validator';
import {
  IsCategoryFoundConstraint,
  IsCategoryListFoundConstraint,
} from './categories/category.validator';
import { IsCommentFoundConstraint } from './comments/comments.validator';
import { IsDirectorFoundConstraint } from './directors/director.validator';
import { IsMovieFoundConstraint } from './movies/movie.validator';
import { IsReviewFoundConstraint } from './reviews/review.validator';
import { IsRoleFoundConstraint } from './roles/role.validator';
import {
  IsUserFoundConstraint,
  IsEmailAlreadyExistConstraint,
} from './users/user.validator';

@Module({
  imports: [UsecasesModule],
  providers: [
    {
      provide: IsRoleFoundConstraint,
      inject: [RolesUseCases],
      useFactory: (roleUsecases: RolesUseCases) =>
        new IsRoleFoundConstraint(roleUsecases),
    },
    {
      provide: IsUserFoundConstraint,
      inject: [UsersUseCases],
      useFactory: (usersUsecases: UsersUseCases) =>
        new IsUserFoundConstraint(usersUsecases),
    },
    {
      provide: IsEmailAlreadyExistConstraint,
      inject: [UsersUseCases],
      useFactory: (userUsercases: UsersUseCases) =>
        new IsEmailAlreadyExistConstraint(userUsercases),
    },
    {
      provide: IsActorFoundConstraint,
      inject: [ActorsUseCases],
      useFactory: (actorsUsecases: ActorsUseCases) =>
        new IsActorFoundConstraint(actorsUsecases),
    },
    {
      provide: IsActorListFoundConstraint,
      inject: [ActorsUseCases],
      useFactory: (actorsUsecases: ActorsUseCases) =>
        new IsActorListFoundConstraint(actorsUsecases),
    },
    {
      provide: IsCategoryFoundConstraint,
      inject: [CategoriesUseCases],
      useFactory: (categoriesUsecases: CategoriesUseCases) =>
        new IsCategoryFoundConstraint(categoriesUsecases),
    },
    {
      provide: IsCategoryListFoundConstraint,
      inject: [CategoriesUseCases],
      useFactory: (categoriesUsecases: CategoriesUseCases) =>
        new IsCategoryListFoundConstraint(categoriesUsecases),
    },
    {
      provide: IsDirectorFoundConstraint,
      inject: [DirectorsUseCases],
      useFactory: (directorsUsecases: DirectorsUseCases) =>
        new IsDirectorFoundConstraint(directorsUsecases),
    },
    {
      provide: IsMovieFoundConstraint,
      inject: [MoviesUseCases],
      useFactory: (moviesUsecases: MoviesUseCases) =>
        new IsMovieFoundConstraint(moviesUsecases),
    },
    {
      provide: IsReviewFoundConstraint,
      inject: [ReviewsUseCases],
      useFactory: (reviewsUsecases: ReviewsUseCases) =>
        new IsReviewFoundConstraint(reviewsUsecases),
    },
    {
      provide: IsCommentFoundConstraint,
      inject: [CommentsUseCases],
      useFactory: (commentsUsecases: CommentsUseCases) =>
        new IsCommentFoundConstraint(commentsUsecases),
    },
  ],
  exports: [],
})
export class ValidatorModule {}
