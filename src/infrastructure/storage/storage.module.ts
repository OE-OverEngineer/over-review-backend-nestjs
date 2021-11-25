import { Module } from '@nestjs/common';
import { AzureBlobStorageModule } from '../config/azure-blob-storage/azure-blob-storage.module';
import { StorageService } from './storage.service';

@Module({
  imports: [AzureBlobStorageModule],
  providers: [StorageService, AzureBlobStorageModule],
})
export class StorageModule {}
