import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateUserDto } from '../users/createUser.dto';

export class RegisterUserDto extends OmitType(CreateUserDto, [
  'roleID',
  'avatarUrl',
]) {
  @ApiProperty()
  @IsNotEmpty()
  avatar: string;
}
