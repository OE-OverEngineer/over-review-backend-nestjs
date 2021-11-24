import { Inject, Module } from '@nestjs/common';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';
import { AzureStorageModule, AzureStorageOptions } from '@nestjs/azure-storage';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';

export const getStorageConfigFactory = (
  config: EnvironmentConfigService,
): AzureStorageOptions =>
  ({
    sasKey: config.getAzureSasKey(),
    accountName: config.getAzureAccountName(),
    containerName: config.getAzureContainerName(),
  } as AzureStorageOptions);

@Module({
  imports: [
    EnvironmentConfigModule,
    AzureStorageModule.withConfigAsync({
      inject: [EnvironmentConfigService],
      useFactory: getStorageConfigFactory,
    }),
  ],
  providers: [EnvironmentConfigService],
})
export class AzureBlobStorageModule {}
