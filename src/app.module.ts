import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { TypeOrmConfigModule } from './infrastructure/config/typeorm/typeorm.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
// import { ValidatorModule } from './infrastructure/validators/validator.module';
import { UsecasesModule } from './usecases/usecases.module';
import { StorageModule } from './infrastructure/storage/storage.module';

@Module({
  imports: [
    EnvironmentConfigModule,
    TypeOrmConfigModule,
    LoggerModule,
    RepositoriesModule,
    ControllersModule,
    UsecasesModule,
    StorageModule,
  ],
  providers: [AppService],
})
export class AppModule {}
