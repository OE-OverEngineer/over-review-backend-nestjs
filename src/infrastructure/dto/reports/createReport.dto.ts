import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsUserFound } from 'src/infrastructure/validators/users/user.validator';

export class CreateReportDto {
  @IsUserFound()
  @ApiProperty()
  targetUserID: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  message: string;
}
