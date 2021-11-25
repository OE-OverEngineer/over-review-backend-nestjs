import { Inject, Module } from '@nestjs/common';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';
import {
  AzureStorageModule,
  AzureStorageOptions,
  AzureStorageService,
} from '@nestjs/azure-storage';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';

export const getStorageConfigFactory = (): AzureStorageOptions =>
  ({
    sasKey:
      '+S1qzC6GcIdGgPMCjR9Tw/GGRDKY2FWsz5Nt2Z+6cPbWIS9ZHjgwqRjnnUiFNAFIjvHve8wdPZy0ICNbYVJoSw==',
    accountName: 'overreview',
    containerName: 'upload',
  } as AzureStorageOptions);

@Module({
  imports: [
    EnvironmentConfigModule,
    AzureStorageModule.withConfigAsync({
      useFactory: getStorageConfigFactory,
    }),
  ],
  providers: [EnvironmentConfigService, AzureStorageService],
  exports: [AzureStorageService],
})
export class AzureBlobStorageModule {}
