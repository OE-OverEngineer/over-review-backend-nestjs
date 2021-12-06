import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from '../users/createUser.dto';

export class RegisterUserDto extends OmitType(CreateUserDto, [
  'roleId',
  'banned',
] as const) {}
