import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { TypeOrmConfigModule } from './infrastructure/config/typeorm/typeorm.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
// import { ValidatorModule } from './infrastructure/validators/validator.module';
import { UsecasesModule } from './usecases/usecases.module';

@Module({
  imports: [
    EnvironmentConfigModule,
    TypeOrmConfigModule,
    LoggerModule,
    RepositoriesModule,
    ControllersModule,
    UsecasesModule,
  ],
  providers: [AppService],
})
export class AppModule {}
