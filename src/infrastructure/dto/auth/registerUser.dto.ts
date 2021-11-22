import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateUserDto } from '../users/createUser.dto';

export class RegisterUserDto extends OmitType(CreateUserDto, ['roleID']) {}
