import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICommentRepository } from 'src/domain/repositories/commentRepository.interface';
import { CreateCommentDto } from 'src/infrastructure/dto/comments/createComment.dto';
import { UpdateCommentDto } from 'src/infrastructure/dto/comments/updateComment.dto';
import { Comment } from 'src/infrastructure/entities/comment.entity';
import { Review } from 'src/infrastructure/entities/review.entity';
import { User } from 'src/infrastructure/entities/user.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class DatabaseCommentsRepository implements ICommentRepository {
  constructor(
    @InjectRepository(Comment)
    private readonly categoryEntityRepository: Repository<Comment>,
  ) {}

  async findAllByID(ids: number[]): Promise<Comment[]> {
    return this.categoryEntityRepository.find({ where: { id: In(ids) } });
  }

  async update(id: number, dto: UpdateCommentDto): Promise<Comment> {
    const comment = this.createDtoToComment(dto);
    comment.id = id;
    return await this.categoryEntityRepository.save(comment);
  }

  async insert(dto: CreateCommentDto, userID: number): Promise<Comment> {
    const comment = this.createDtoToComment(dto, userID);
    return await this.categoryEntityRepository.save(comment);
  }

  async findAll(): Promise<Comment[]> {
    return this.categoryEntityRepository.find({
      relations: ['review'],
    });
  }

  async findById(id: number): Promise<Comment> {
    return this.categoryEntityRepository.findOne({ id });
  }

  async deleteById(id: number): Promise<void> {
    await this.categoryEntityRepository.delete(id);
  }

  private createDtoToComment(
    dto: CreateCommentDto | UpdateCommentDto,
    userID?: number,
  ): Comment {
    const comment = new Comment();
    const user = new User();
    user.id = userID;
    const review = new Review();
    review.id = dto.reviewID;
    comment.message = dto.message;
    if (userID) comment.user = user;
    comment.review = review;
    return comment;
  }
}
