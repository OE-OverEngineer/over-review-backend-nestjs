import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class RequestMovieDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.trim())
  @ApiProperty()
  title: string;

  @ApiProperty()
  @IsDateString()
  startDate: Date;

  @ApiProperty()
  @Transform(({ value }: TransformFnParams) => value.trim())
  description: string;
}
