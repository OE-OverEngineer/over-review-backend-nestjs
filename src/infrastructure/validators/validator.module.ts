import { Module } from '@nestjs/common';
import { UsersUseCases } from 'src/usecases/users.usecase';
import { RepositoriesModule } from '../repositories/repositories.module';
import { DatabaseUsersRepository } from '../repositories/users/users.repository';
import { IsUserEmailAlreadyExist } from './user/user.validator';

@Module({
  imports: [],
  controllers: [],
  providers: [
    IsUserEmailAlreadyExist,
    // {
    //   provide: IsUserAlreadyExist,
    //   inject: [DatabaseUsersRepository],
    //   useFactory: (repository: DatabaseUsersRepository) =>
    //     new IsUserAlreadyExist(repository),
    // },
    // {
    //   provide: IsUserEmailAlreadyExist,
    //   inject: [UsersUseCases],
    //   useFactory: (userUsercases: UsersUseCases) =>
    //     new IsUserEmailAlreadyExist(userUsercases),
    // },
  ],
  exports: [],
})
export class ValidatorModule {}
