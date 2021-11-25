import { UploadedFileMetadata } from '@nestjs/azure-storage';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';
import { CreateUserDto } from '../users/createUser.dto';

export class RegisterUserDto extends OmitType(CreateUserDto, ['roleID']) {}
