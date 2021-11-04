import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  displayName: string;
  @ApiProperty()
  avatar: string;
  @ApiProperty()
  dateOfBirth: Date;
  @ApiProperty()
  gender: 'Male' | 'Female';
}
