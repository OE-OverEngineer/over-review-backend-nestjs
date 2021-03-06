import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt-auth.guard';
import { Role } from 'src/infrastructure/auth/role.enum';
import { Roles } from 'src/infrastructure/auth/roles.decorator';
import { RolesGuard } from 'src/infrastructure/auth/roles.guard';
import { CreateCommentDto } from 'src/infrastructure/dto/comments/createComment.dto';
import { CreateReplyDto } from 'src/infrastructure/dto/replies/createReply.dto';
import { CommentsUseCases } from 'src/usecases/comments/comments.usecase';
import { RepliesUsecase } from 'src/usecases/replies/replies.usecase';

@ApiTags('Replies')
@Controller('replies')
export class RepliesController {
  constructor(private readonly repliesUsecases: RepliesUsecase) {}

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Member)
  @Post()
  create(@Body() dto: CreateReplyDto, @Request() req: any) {
    const userID = Number(req.user.id);
    return this.repliesUsecases.create(dto, userID);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  findAll() {
    return this.repliesUsecases.findAll();
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Member)
  @Delete('/:id')
  delete(@Param() id: number, @Request() req: any) {
    const userID = Number(req.user.id);
    const role = req.user.role;
    return this.repliesUsecases.delete(id, role.title, userID);
  }
}
