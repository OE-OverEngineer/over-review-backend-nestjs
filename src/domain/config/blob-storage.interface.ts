export interface IBlobStorage {
  getAzureSasKey(): string;
  getAzureAccountName(): string;
  getAzureContainerName(): string;
}
