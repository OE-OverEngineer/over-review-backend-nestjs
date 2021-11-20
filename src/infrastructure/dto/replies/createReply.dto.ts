import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsCommentFound } from 'src/infrastructure/validators/comments/comments.validator';

export class CreateReplyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty()
  @IsCommentFound()
  commentID: number;
}
