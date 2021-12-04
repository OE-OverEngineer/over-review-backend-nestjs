import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from 'src/infrastructure/dto/comments/createComment.dto';
import { CreateReplyDto } from 'src/infrastructure/dto/replies/createReply.dto';
import { CommentsUseCases } from 'src/usecases/comments/comments.usecase';
import { RepliesUsecase } from 'src/usecases/replies/replies.usecase';

@ApiTags('Replies')
@Controller('replies')
export class RepliesController {
  constructor(private readonly repliesUsecases: RepliesUsecase) {}

  @Post()
  create(@Body() dto: CreateReplyDto) {
    const id = 1;
    return this.repliesUsecases.create(dto, id);
  }

  @Get()
  findAll() {
    return this.repliesUsecases.findAll();
  }
}
