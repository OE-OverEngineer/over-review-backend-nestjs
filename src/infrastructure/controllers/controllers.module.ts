import { Module } from '@nestjs/common';
import { UsersUseCases } from 'src/usecases/users.usecase';
import { RepositoriesModule } from '../repositories/repositories.module';
import { UsersRepository } from '../repositories/users/users.repository';
import { MoviesController } from './movies/movies.controller';
import { UsersController } from './users/users.controller';
import { ActorsController } from './actors/actors.controller';
import { DirectorsController } from './directors/directors.controller';

@Module({
  imports: [RepositoriesModule],
  controllers: [UsersController, MoviesController, ActorsController, DirectorsController],

  providers: [
    {
      provide: UsersUseCases,
      inject: [UsersRepository],
      useFactory: (repository: UsersRepository) =>
        new UsersUseCases(repository),
    },
  ],
})
export class ControllersModule {}
