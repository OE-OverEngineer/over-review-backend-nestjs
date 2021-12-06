import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICommentRepository } from 'src/domain/repositories/commentRepository.interface';
import { IReplyRepository } from 'src/domain/repositories/replyRepository.interface';
import { CreateCommentDto } from 'src/infrastructure/dto/comments/createComment.dto';
import { UpdateCommentDto } from 'src/infrastructure/dto/comments/updateComment.dto';
import { CreateReplyDto } from 'src/infrastructure/dto/replies/createReply.dto';
import { UpdateReplyDto } from 'src/infrastructure/dto/replies/updateReply.dto';
import { Comment } from 'src/infrastructure/entities/comment.entity';
import { Reply } from 'src/infrastructure/entities/reply.entity';
import { Review } from 'src/infrastructure/entities/review.entity';
import { User } from 'src/infrastructure/entities/user.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class DatabaseRepliesRepository implements IReplyRepository {
  constructor(
    @InjectRepository(Reply)
    private readonly replyEntityRepository: Repository<Reply>,
  ) {}
  findByIdUserId(id: number, userID: number): Promise<Reply> {
    return this.replyEntityRepository.findOne({
      where: {
        id: id,
        byUser: {
          id: userID,
        },
      },
    });
  }

  async findAllByID(ids: number[]): Promise<Reply[]> {
    return this.replyEntityRepository.find({ where: { id: In(ids) } });
  }

  async update(
    id: number,
    dto: UpdateReplyDto,
    userID: number,
  ): Promise<Reply> {
    const reply = this.createDtoToReply(dto, userID);
    return await this.replyEntityRepository.save(reply);
  }

  async insert(dto: CreateReplyDto, userID: number): Promise<Reply> {
    const Reply = this.createDtoToReply(dto, userID);
    return await this.replyEntityRepository.save(Reply);
  }

  async findAll(): Promise<Reply[]> {
    return this.replyEntityRepository.find();
  }

  async findById(id: number): Promise<Reply> {
    return this.replyEntityRepository.findOne({ id });
  }

  async deleteById(id: number): Promise<void> {
    await this.replyEntityRepository.delete(id);
  }

  private createDtoToReply(
    dto: CreateReplyDto | UpdateReplyDto,
    userID: number,
  ): Reply {
    const reply = new Reply();
    const user = new User();
    user.id = userID;
    const comment = new Comment();
    comment.id = dto.commentID;
    reply.message = dto.message;
    reply.byUser = user;
    reply.comment = comment;
    return reply;
  }
}
