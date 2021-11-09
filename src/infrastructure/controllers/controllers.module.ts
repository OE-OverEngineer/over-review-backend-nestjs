import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersUseCases } from 'src/usecases/users.usecase';
import { RepositoriesModule } from '../repositories/repositories.module';
import { UsersRepository } from '../repositories/users/users.repository';
import { UsersController } from './users/users.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { LocalStrategy } from '../auth/auth.strategy';

@Module({
  imports: [RepositoriesModule, PassportModule],
  controllers: [UsersController, AuthController],
  providers: [
    {
      inject: [UsersRepository],
      provide: UsersUseCases,
      useFactory: (userRepository: UsersRepository) =>
        new UsersUseCases(userRepository),
    },
    {
      inject: [UsersRepository],
      provide: AuthService,
      useFactory: (userRepository: UsersRepository) =>
        new AuthService(userRepository),
    },
    {
      inject: [AuthService],
      provide: LocalStrategy,
      useFactory: (authService: AuthService) => new LocalStrategy(authService),
    },
  ],
})
export class ControllersModule {}
