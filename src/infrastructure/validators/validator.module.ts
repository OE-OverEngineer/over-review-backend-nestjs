import { Module } from '@nestjs/common';
import { ActorsUseCases } from 'src/usecases/actors/actors.usecase';
import { CategoriesUseCases } from 'src/usecases/categories/categories.usecase';
import { DirectorsUseCases } from 'src/usecases/directors/directors.usecase';
import { MoviesUseCases } from 'src/usecases/movies.usecase';
import { ReviewsUsecase } from 'src/usecases/reviews.usecase';
import { RoleUseCases } from 'src/usecases/roles/roles.usecase';

import { UsecasesModule } from 'src/usecases/usecases.module';
import { UsersUseCases } from 'src/usecases/users.usecase';
import {
  IsActorFoundConstraint,
  IsActorListFoundConstraint,
} from './actors/actors.validator';
import {
  IsCategoryFoundConstraint,
  IsCategoryListFoundConstraint,
} from './categories/category.validator';
import { IsDirectorFoundConstraint } from './directors/director.validator';
import { IsMovieFoundConstraint } from './movies/movie.validator';
import { IsReviewFoundConstraint } from './reviews/review.validator';
import { IsRoleFoundConstraint } from './roles/role.validator';
import {
  IsUserFoundConstraint,
  IsUserEmailAlreadyExistConstraint,
} from './users/user.validator';

@Module({
  imports: [UsecasesModule],
  providers: [
    {
      provide: IsRoleFoundConstraint,
      inject: [RoleUseCases],
      useFactory: (roleUsecases: RoleUseCases) =>
        new IsRoleFoundConstraint(roleUsecases),
    },
    {
      provide: IsUserFoundConstraint,
      inject: [UsersUseCases],
      useFactory: (usersUsecases: UsersUseCases) =>
        new IsUserFoundConstraint(usersUsecases),
    },
    {
      provide: IsUserEmailAlreadyExistConstraint,
      inject: [UsersUseCases],
      useFactory: (userUsercases: UsersUseCases) =>
        new IsUserEmailAlreadyExistConstraint(userUsercases),
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
      inject: [ReviewsUsecase],
      useFactory: (reviewsUsecases: ReviewsUsecase) =>
        new IsReviewFoundConstraint(reviewsUsecases),
    },
  ],
  exports: [],
})
export class ValidatorModule {}
