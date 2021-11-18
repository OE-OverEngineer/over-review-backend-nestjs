import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICommentRepository } from 'src/domain/repositories/commentRepository.interface';
import { CreateCommentDto } from 'src/infrastructure/dto/comments/createComment.dto';
import { UpdateCommentDto } from 'src/infrastructure/dto/comments/updateComment.dto';
import { Comment } from 'src/infrastructure/entities/comment.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class DatabaseCommentRepository implements ICommentRepository {
  constructor(
    @InjectRepository(Comment)
    private readonly categoryEntityRepository: Repository<Comment>,
  ) {}

  async findAllByID(ids: number[]): Promise<Comment[]> {
    return this.categoryEntityRepository.find({ where: { id: In(ids) } });
  }

  async update(id: number, dto: UpdateCommentDto): Promise<Comment> {
    // await this.categoryEntityRepository.save({ id: id }, { ...dto });
    return await this.categoryEntityRepository.findOne(id);
  }

  async insert(dto: CreateCommentDto): Promise<Comment> {
    return await this.categoryEntityRepository.save(dto);
  }

  async findAll(): Promise<Comment[]> {
    return this.categoryEntityRepository.find();
  }

  async findById(id: number): Promise<Comment | undefined> {
    return this.categoryEntityRepository.findOne({ id });
  }

  async deleteById(id: number): Promise<void> {
    await this.categoryEntityRepository.delete(id);
  }
}
