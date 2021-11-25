import { UploadedFileMetadata } from '@nestjs/azure-storage';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { HasMimeType, IsFile, MaxFileSize } from 'nestjs-form-data';
import { CreateUserDto } from '../users/createUser.dto';

export class RegisterUserDto extends OmitType(CreateUserDto, [
  'roleID',
  'avatarUrl',
]) {
  @ApiProperty()
  @IsFile()
  @MaxFileSize(1e6)
  @HasMimeType(['image/jpeg', 'image/png'])
  avatarUrl: any;
}
