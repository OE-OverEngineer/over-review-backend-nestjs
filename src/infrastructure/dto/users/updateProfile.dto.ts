import { OmitType, PartialType } from '@nestjs/swagger';
import { UpdateUserDto } from './updateUser.dto';

export class UpdateProfileDto extends PartialType(
  OmitType(UpdateUserDto, ['roleId'] as const),
) {}
