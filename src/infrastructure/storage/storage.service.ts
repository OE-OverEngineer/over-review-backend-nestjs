import { BlobServiceClient } from '@azure/storage-blob';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';

export class StorageService {
  constructor(private readonly config: EnvironmentConfigService) {
    this.blobServiceClient = BlobServiceClient.fromConnectionString(
      this.config.getAzureBlobConnectionString(),
    );
  }

  private blobServiceClient;

  async uploadAvatar(b64Image: string, filename: string): Promise<string> {
    return await this.uploadImageToBlob(b64Image, filename, 'avatar');
  }

  async uploadPoster(b64Image: string, filename: string): Promise<string> {
    return await this.uploadImageToBlob(b64Image, filename, 'poster');
  }

  private async uploadImageToBlob(
    data: string,
    fileName: string,
    container: string,
  ): Promise<string> {
    const containerClient = await this.blobServiceClient.getContainerClient(
      container,
    );
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    const matches = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    const buffer = Buffer.from(matches[2], 'base64');

    const response = await blockBlobClient.upload(buffer, buffer.byteLength);
    return response._response.request.url;
  }
}
