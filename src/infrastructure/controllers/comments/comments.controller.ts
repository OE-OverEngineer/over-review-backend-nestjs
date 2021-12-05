import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt-auth.guard';
import { CreateCommentDto } from 'src/infrastructure/dto/comments/createComment.dto';
import { CommentsUseCases } from 'src/usecases/comments/comments.usecase';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentUsecases: CommentsUseCases) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateCommentDto, @Request() req: any) {
    const userID = Number(req.user.id);
    return this.commentUsecases.create(dto, userID);
  }

  @Get()
  findAll() {
    return this.commentUsecases.findAll();
  }
}
