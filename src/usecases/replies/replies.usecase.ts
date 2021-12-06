import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { IReplyRepository } from 'src/domain/repositories/replyRepository.interface';
import { Role } from 'src/infrastructure/auth/role.enum';
import { CreateReplyDto } from 'src/infrastructure/dto/replies/createReply.dto';
import { UpdateReplyDto } from 'src/infrastructure/dto/replies/updateReply.dto';
import { Reply } from 'src/infrastructure/entities/reply.entity';

export class RepliesUsecase {
  constructor(private readonly replyRepository: IReplyRepository) {}

  async create(dto: CreateReplyDto, userID: number): Promise<Reply> {
    return await this.replyRepository.insert(dto, userID);
  }

  async update(
    id: number,
    dto: UpdateReplyDto,
    userID: number,
  ): Promise<Reply> {
    const reply = await this.findOne(id);
    if (!reply) throw new NotFoundException('reply not found');
    else return await this.replyRepository.update(id, dto, userID);
  }

  async delete(id: number, roleTitle: string, userID?: number): Promise<void> {
    if (roleTitle === Role.Admin) {
      await this.replyRepository.deleteById(id);
    } else if (roleTitle === Role.Member) {
      const reply = await this.replyRepository.findByIdUserId(id, userID);
      if (!reply) throw new ForbiddenException();
      else await this.replyRepository.deleteById(id);
    }
  }

  async findOne(id: number): Promise<Reply> {
    if (id < 0) throw new BadRequestException();
    const reply = await this.replyRepository.findById(id);
    return reply;
  }

  async findAll(): Promise<Reply[]> {
    return await this.replyRepository.findAll();
  }
}
