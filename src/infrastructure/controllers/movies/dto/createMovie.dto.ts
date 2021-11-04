import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  directorID: string;
  @ApiProperty()
  actorsID: string[];
  @ApiProperty()
  startDate: string;
  @ApiProperty()
  dateOfBirth: Date;
  @ApiProperty()
  gender: 'Male' | 'Female';
}
