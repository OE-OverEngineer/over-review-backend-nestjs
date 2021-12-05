import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsCommentFound } from 'src/infrastructure/validators/comments/comments.validator';

export class CreateReplyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.trim())
  message: string;

  @ApiProperty()
  @IsCommentFound()
  commentID: number;
}
