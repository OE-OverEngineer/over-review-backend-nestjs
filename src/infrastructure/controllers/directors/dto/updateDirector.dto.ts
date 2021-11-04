import { PartialType } from '@nestjs/mapped-types';
import { CreateDirectorDto } from './createDirector.dto';

export class UpdateDirectorDto extends PartialType(CreateDirectorDto) {}
