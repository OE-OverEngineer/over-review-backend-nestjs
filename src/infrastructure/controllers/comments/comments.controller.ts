import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt-auth.guard';
import { Role } from 'src/infrastructure/auth/role.enum';
import { Roles } from 'src/infrastructure/auth/roles.decorator';
import { RolesGuard } from 'src/infrastructure/auth/roles.guard';
import { CreateCommentDto } from 'src/infrastructure/dto/comments/createComment.dto';
import { CommentsUseCases } from 'src/usecases/comments/comments.usecase';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentUsecases: CommentsUseCases) {}

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Member)
  @Post()
  create(@Body() dto: CreateCommentDto, @Request() req: any) {
    const userID = Number(req.user.id);
    return this.commentUsecases.create(dto, userID);
  }

  // @ApiBearerAuth('access-token')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  @Get()
  findAll() {
    return this.commentUsecases.findAll();
  }
}
