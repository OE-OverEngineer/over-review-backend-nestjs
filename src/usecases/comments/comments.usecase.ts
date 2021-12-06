import { ForbiddenException } from '@nestjs/common';
import { ICommentRepository } from 'src/domain/repositories/commentRepository.interface';
import { JwtData } from 'src/infrastructure/auth/jwt.interface';
import { CreateCommentDto } from 'src/infrastructure/dto/comments/createComment.dto';
import { UpdateCommentDto } from 'src/infrastructure/dto/comments/updateComment.dto';
import { Comment } from 'src/infrastructure/entities/comment.entity';

export class CommentsUseCases {
  constructor(private readonly commentRepositories: ICommentRepository) {}

  async create(dto: CreateCommentDto, userID: number): Promise<Comment> {
    return await this.commentRepositories.insert(dto, userID);
  }
  async update(
    id: number,
    dto: UpdateCommentDto,
    user: JwtData,
  ): Promise<Comment> {
    const review = await this.findOne(id);
    if (user.role === 'admin' || review.user.id === user.id)
      await this.commentRepositories.update(id, dto);
    throw new ForbiddenException();
  }
  async delete(id: number, user: JwtData): Promise<void> {
    const comment = await this.findOne(id);
    if (user.role === 'admin' || comment.user.id === user.id)
      await this.commentRepositories.deleteById(id);
    throw new ForbiddenException();
  }

  async findOne(id: number): Promise<Comment> {
    return await this.commentRepositories.findById(id);
  }

  async findAll(): Promise<Comment[]> {
    return await this.commentRepositories.findAll();
  }

  // async findAllByID(ids: number[]): Promise<Comment[]> {
  //   return await this.commentRepositories.findAllByID(ids);
  // }
}
