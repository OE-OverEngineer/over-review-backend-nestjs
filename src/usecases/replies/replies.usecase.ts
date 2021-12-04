import { IReplyRepository } from 'src/domain/repositories/replyRepository.interface copy';
import { CreateReplyDto } from 'src/infrastructure/dto/replies/createReply.dto';
import { UpdateReplyDto } from 'src/infrastructure/dto/replies/updateReply.dto';
import { Reply } from 'src/infrastructure/entities/reply.entity';

export class RepliesUsecase {
  constructor(private readonly replyRepository: IReplyRepository) {}

  async create(dto: CreateReplyDto, userID: number): Promise<Reply> {
    return await this.replyRepository.insert(dto, userID);
  }

  async update(id: number, dto: UpdateReplyDto): Promise<Reply> {
    return await this.replyRepository.update(id, dto);
  }

  async delete(id: number): Promise<void> {
    await this.replyRepository.deleteById(id);
  }

  async findOne(id: number): Promise<Reply> {
    const reply = await this.replyRepository.findById(id);
    return reply;
  }

  async findAll(): Promise<Reply[]> {
    return await this.replyRepository.findAll();
  }
}
