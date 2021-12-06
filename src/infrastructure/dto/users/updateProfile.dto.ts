import { PartialType } from '@nestjs/swagger';
import { UpdateUserDto } from './updateUser.dto';

export class UpdateProfileDto extends PartialType(UpdateUserDto) {}
