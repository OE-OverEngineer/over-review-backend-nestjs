import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { StorageService } from './storage.service';

@Module({
  imports: [EnvironmentConfigModule],
  providers: [
    {
      provide: StorageService,
      inject: [EnvironmentConfigService],
      useFactory: (config: EnvironmentConfigService) =>
        new StorageService(config),
    },
  ],
  exports: [StorageService],
})
export class StorageModule {}
