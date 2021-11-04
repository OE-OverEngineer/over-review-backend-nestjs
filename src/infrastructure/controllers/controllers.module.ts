import { Module } from '@nestjs/common';
import { RepositoriesModule } from '../repositories/repositories.module';
import { MoviesController } from './movies/movies.controller';
import { UsersController } from './users/users.controller';

@Module({
  imports: [RepositoriesModule],
  controllers: [UsersController, MoviesController],
})
export class ControllersModule {}
