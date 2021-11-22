import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { DatabaseUsersRepository } from '../repositories/users/users.repository';
import { RepositoriesModule } from '../repositories/repositories.module';
import { AuthUseCase } from 'src/usecases/auth/auth.usecase';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { UsecasesModule } from 'src/usecases/usecases.module';
import { UsersUseCases } from 'src/usecases/users/users.usecase';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvironmentConfigModule],
      useFactory: async (config: EnvironmentConfigService) => ({
        secret: config.getJwtSecret(),
        signOptions: {
          expiresIn: '1h',
        },
      }),
      inject: [EnvironmentConfigService],
    }),
    RepositoriesModule,
    EnvironmentConfigService,
    UsecasesModule,
  ],
  providers: [
    {
      provide: AuthUseCase,
      inject: [DatabaseUsersRepository, JwtService, UsersUseCases],
      useFactory: (
        repository: DatabaseUsersRepository,
        jwtService: JwtService,
        usersUseCase: UsersUseCases,
      ) => new AuthUseCase(repository, jwtService, usersUseCase),
    },
    LocalStrategy,
    {
      provide: JwtStrategy,
      inject: [EnvironmentConfigService],
      useFactory: (config: EnvironmentConfigService) => new JwtStrategy(config),
    },
    EnvironmentConfigService,
  ],
  exports: [AuthUseCase],
})
export class AuthModule {}
