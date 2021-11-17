import { ApiProperty } from '@nestjs/swagger';

export class CreateActorDto {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
}
