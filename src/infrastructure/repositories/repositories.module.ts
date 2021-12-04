import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Actor } from '../entities/actor.entity';
import { Category } from '../entities/category.entity';
import { Comment } from '../entities/comment.entity';
import { Director } from '../entities/director.entity';
import { Like } from '../entities/like.entity';
import { Movie } from '../entities/movie.entity';
import { Reply } from '../entities/reply.entity';
import { Report } from '../entities/report.entity';
import { Review } from '../entities/review.entity';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import { DatabaseCategoryRepository } from './categories/categories.repository';
import { PostSubscriber } from '../subscriber/reviews/review.subscriber';
import { DatabaseActorsRepository } from './actors/actors.repository';
import { DatabaseCommentsRepository } from './comments/comments.repository';
import { DatabaseDirectorsRepository } from './directors/directors.repository';
import { DatabaseLikesRepository } from './likes/likes.repository';
import { DatabaseMovieRepository } from './movie/movie.repository';
import { DatabaseReportRepository } from './reports/reports.repository';
import { DatabaseReviewRepository } from './reviews/review.repository';
import { MockRoleRepository } from './roles/roles.mock.repositoty';
import { DatabaseUsersRepository } from './users/users.repository';
import { LikesSubscriber } from '../subscriber/likes/likes.subscriber';
import { DatabaseRepliesRepository } from './replies/replies.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Actor,
      Comment,
      Director,
      Movie,
      Report,
      Review,
      Role,
      User,
      Category,
      Like,
      Reply,
    ]),
  ],
  providers: [
    DatabaseUsersRepository,
    DatabaseCommentsRepository,
    DatabaseActorsRepository,
    DatabaseMovieRepository,
    DatabaseDirectorsRepository,
    DatabaseReportRepository,
    DatabaseReviewRepository,
    DatabaseCategoryRepository,
    DatabaseLikesRepository,
    DatabaseRepliesRepository,
    MockRoleRepository,
    PostSubscriber,
    LikesSubscriber,
  ],
  exports: [
    DatabaseUsersRepository,
    DatabaseCommentsRepository,
    DatabaseActorsRepository,
    DatabaseLikesRepository,
    DatabaseMovieRepository,
    DatabaseDirectorsRepository,
    DatabaseReportRepository,
    DatabaseReviewRepository,
    DatabaseCategoryRepository,
    DatabaseRepliesRepository,
    MockRoleRepository,
    PostSubscriber,
    LikesSubscriber,
  ],
})
export class RepositoriesModule {}
