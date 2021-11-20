import { CreateCommentDto } from 'src/infrastructure/dto/comments/createComment.dto';
import { UpdateCommentDto } from 'src/infrastructure/dto/comments/updateComment.dto';
import { Comment } from 'src/infrastructure/entities/comment.entity';

export interface ICommentRepository {
  insert(dto: CreateCommentDto, userID: number): Promise<Comment>;
  findAll(): Promise<Comment[]>;
  findById(id: number): Promise<Comment>;
  update(id: number, dto: UpdateCommentDto): Promise<Comment>;
  deleteById(id: number): Promise<void>;
}
