import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt-auth.guard';
import { CreateCommentDto } from 'src/infrastructure/dto/comments/createComment.dto';
import { CreateReplyDto } from 'src/infrastructure/dto/replies/createReply.dto';
import { CommentsUseCases } from 'src/usecases/comments/comments.usecase';
import { RepliesUsecase } from 'src/usecases/replies/replies.usecase';

@ApiTags('Replies')
@Controller('replies')
export class RepliesController {
  constructor(private readonly repliesUsecases: RepliesUsecase) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateReplyDto, @Request() req: any) {
    const userID = Number(req.user.id);
    return this.repliesUsecases.create(dto, userID);
  }

  @Get()
  findAll() {
    return this.repliesUsecases.findAll();
  }
}
