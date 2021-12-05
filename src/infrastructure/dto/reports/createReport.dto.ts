import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsUserFound } from 'src/infrastructure/validators/users/user.validator';

export class CreateReportDto {
  @IsUserFound()
  @ApiProperty()
  targetUserID: number;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.trim())
  @ApiProperty()
  message: string;
}
