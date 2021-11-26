import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { UsersController } from './users/users.controller';
import { ActorsController } from './actors/actors.controller';
import { DirectorsController } from './directors/directors.controller';
import { ReviewsController } from './reviews/reviews.controller';
import { AuthModule } from '../auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { CategoriesController } from './category/categories.controller';
import { ValidatorModule } from '../validators/validator.module';
import { UsecasesModule } from 'src/usecases/usecases.module';
import { CommentsController } from './comments/comments.controller';
import { RolesController } from './roles/roles.controller';
import { ReportsController } from './reports/reports.controller';
// import { ValidatorModule } from '../validators/validator.module';

@Module({
  imports: [AuthModule, UsecasesModule, ValidatorModule],
  controllers: [
    AuthController,
    UsersController,
    MoviesController,
    ReviewsController,
    CommentsController,
    ActorsController,
    DirectorsController,
    CategoriesController,
    RolesController,
    ReportsController,
  ],

  providers: [],
  exports: [],
})
export class ControllersModule {}
