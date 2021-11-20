import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateCommentDto } from 'src/infrastructure/dto/comments/createComment.dto';
import { CommentsUseCases } from 'src/usecases/comments/comments.usecase';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentUsecases: CommentsUseCases) {}

  @Post()
  create(@Body() dto: CreateCommentDto) {
    const id = 1;
    return this.commentUsecases.create(dto, id);
  }

  @Get()
  findAll() {
    return this.commentUsecases.findAll();
  }
}
