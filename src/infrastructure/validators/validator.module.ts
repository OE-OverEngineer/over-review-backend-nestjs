import { Module } from '@nestjs/common';
import { ActorsUseCases } from 'src/usecases/actors.usecase';
import { CategoriesUseCases } from 'src/usecases/categories.usecase';
import { RoleUseCases } from 'src/usecases/roles.usecase';
import { UsecasesModule } from 'src/usecases/usecases.module';
import { UsersUseCases } from 'src/usecases/users.usecase';
import {
  IsActorAlreadyExistConstraint,
  IsActorListAlreadyExistConstraint,
} from './actors/actors.validator';
import {
  IsCategoryAlreadyExistConstraint,
  IsCategoryTitleAlreadyExistConstraint,
} from './categories/category.validator';
import { IsRoleAlreadyExistConstraint } from './roles/role.validator';
import {
  IsUserAlreadyExistConstraint,
  IsUserEmailAlreadyExistConstraint,
} from './users/user.validator';

@Module({
  imports: [UsecasesModule],
  providers: [
    {
      provide: IsRoleAlreadyExistConstraint,
      inject: [RoleUseCases],
      useFactory: (roleUsecases: RoleUseCases) =>
        new IsRoleAlreadyExistConstraint(roleUsecases),
    },
    {
      provide: IsUserAlreadyExistConstraint,
      inject: [UsersUseCases],
      useFactory: (usersUsecases: UsersUseCases) =>
        new IsUserAlreadyExistConstraint(usersUsecases),
    },
    {
      provide: IsUserEmailAlreadyExistConstraint,
      inject: [UsersUseCases],
      useFactory: (userUsercases: UsersUseCases) =>
        new IsUserEmailAlreadyExistConstraint(userUsercases),
    },
    {
      provide: IsActorAlreadyExistConstraint,
      inject: [ActorsUseCases],
      useFactory: (actorsUsecases: ActorsUseCases) =>
        new IsActorAlreadyExistConstraint(actorsUsecases),
    },
    {
      provide: IsActorListAlreadyExistConstraint,
      inject: [ActorsUseCases],
      useFactory: (actorsUsecases: ActorsUseCases) =>
        new IsActorListAlreadyExistConstraint(actorsUsecases),
    },
    {
      provide: IsCategoryAlreadyExistConstraint,
      inject: [CategoriesUseCases],
      useFactory: (categoriesUsecases: CategoriesUseCases) =>
        new IsCategoryAlreadyExistConstraint(categoriesUsecases),
    },
    {
      provide: IsCategoryTitleAlreadyExistConstraint,
      inject: [CategoriesUseCases],
      useFactory: (categoriesUsecases: CategoriesUseCases) =>
        new IsCategoryTitleAlreadyExistConstraint(categoriesUsecases),
    },
  ],
  exports: [],
})
export class ValidatorModule {}
