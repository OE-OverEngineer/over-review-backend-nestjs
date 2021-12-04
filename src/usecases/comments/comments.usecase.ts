import { ICommentRepository } from 'src/domain/repositories/commentRepository.interface';
import { CreateCommentDto } from 'src/infrastructure/dto/comments/createComment.dto';
import { UpdateCommentDto } from 'src/infrastructure/dto/comments/updateComment.dto';
import { Comment } from 'src/infrastructure/entities/comment.entity';

export class CommentsUseCases {
  constructor(private readonly commentRepositories: ICommentRepository) {}

  async create(dto: CreateCommentDto, userID: number): Promise<Comment> {
    return await this.commentRepositories.insert(dto, userID);
  }
  async update(id: number, dto: UpdateCommentDto): Promise<Comment> {
    return await this.commentRepositories.update(id, dto);
  }
  async delete(id: number): Promise<void> {
    await this.commentRepositories.deleteById(id);
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
