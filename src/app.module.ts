import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { TypeOrmConfigModule } from './infrastructure/config/typeorm/typeorm.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { MoviesController } from './infrastructure/controllers/movies/movies.controller';

@Module({
  imports: [
    EnvironmentConfigModule,
    TypeOrmConfigModule,
    ExceptionsModule,
    LoggerModule,
    RepositoriesModule,
    ControllersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
