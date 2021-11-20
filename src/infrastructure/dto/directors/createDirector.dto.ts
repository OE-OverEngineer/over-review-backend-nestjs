import { ApiProperty } from '@nestjs/swagger';

export class CreateDirectorDto {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;

  @ApiProperty()
  imageUrl: string;
}
