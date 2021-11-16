import { Module } from '@nestjs/common';
import { UsecasesModule } from 'src/usecases/usecases.module';
import { UsersUseCases } from 'src/usecases/users.usecase';
import { IsUserEmailAlreadyExist } from './user/user.validator';

@Module({
  imports: [UsecasesModule],
  controllers: [],
  providers: [
    // IsUserEmailAlreadyExist,
    // {
    //   provide: IsUserAlreadyExist,
    //   inject: [DatabaseUsersRepository],
    //   useFactory: (repository: DatabaseUsersRepository) =>
    //     new IsUserAlreadyExist(repository),
    // },
    {
      provide: IsUserEmailAlreadyExist,
      inject: [UsersUseCases],
      useFactory: (userUsercases: UsersUseCases) => {
        console.log(userUsercases);
        return new IsUserEmailAlreadyExist(userUsercases);
      },
    },
  ],
  exports: [],
})
export class ValidatorModule {}
