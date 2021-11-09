import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './createMovie.dto';

export class UpdateMovieDto extends PartialType(CreateUserDto) {}
