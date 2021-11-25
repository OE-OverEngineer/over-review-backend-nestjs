import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { TypeOrmConfigModule } from './infrastructure/config/typeorm/typeorm.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
// import { ValidatorModule } from './infrastructure/validators/validator.module';
import { UsecasesModule } from './usecases/usecases.module';
import { AzureBlobStorageModule } from './infrastructure/config/azure-blob-storage/azure-blob-storage.module';
import { StorageModule } from './infrastructure/storage/storage.module';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    EnvironmentConfigModule,
    TypeOrmConfigModule,
    // NestjsFormDataModule,
    LoggerModule,
    RepositoriesModule,
    ControllersModule,
    UsecasesModule,

    AzureBlobStorageModule,
    StorageModule,
  ],
  providers: [AppService],
})
export class AppModule {}
