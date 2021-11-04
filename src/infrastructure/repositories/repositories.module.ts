import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from '../entities/actor.entity';
import { Comment } from '../entities/comment.entity';
import { Director } from '../entities/director.entity';
import { Movie } from '../entities/movie.entity';
import { Report } from '../entities/report.entity';
import { Review } from '../entities/review.entity';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import { AuthRepository } from './auth/auth.repository';
import { LocalStrategy } from './auth/auth.strategy';
import { UsersRepository } from './users/users.repository';

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
    ]),
  ],
  providers: [UsersRepository, AuthRepository, LocalStrategy],
  exports: [UsersRepository],
})
export class RepositoriesModule {}
