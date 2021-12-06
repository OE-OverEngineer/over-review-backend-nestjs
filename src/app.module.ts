import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { TypeOrmConfigModule } from './infrastructure/config/typeorm/typeorm.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { UsecasesModule } from './usecases/usecases.module';
import { StorageModule } from './infrastructure/storage/storage.module';

@Module({
  imports: [
    EnvironmentConfigModule,
    TypeOrmConfigModule,
    RepositoriesModule,
    ControllersModule,
    UsecasesModule,
    StorageModule,
  ],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class AppModule {}
