import {
  AzureStorageFileInterceptor,
  AzureStorageService,
  UploadedFileMetadata,
} from '@nestjs/azure-storage';
import { Injectable, UseInterceptors } from '@nestjs/common';

@Injectable()
export class StorageService {
  constructor(private readonly azureStorage: AzureStorageService) {}

  @UseInterceptors(
    AzureStorageFileInterceptor('file', null, {
      containerName: 'avatar',
    }),
  )
  async uploadProfile(file: UploadedFileMetadata): Promise<string> {
    file = {
      ...file,
      originalname: 'foo-bar.txt',
    };
    const storageUrl = await this.azureStorage.upload(file);
    return storageUrl;
  }

  uploadPoster(): Promise<string> {
    return;
  }
}
