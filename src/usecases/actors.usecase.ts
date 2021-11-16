import { IActorRepository } from 'src/domain/repositories/actorRepository.interface';
import { CreateActorDto } from 'src/infrastructure/controllers/actors/dto/createActor.dto';
import { UpdateActorDto } from 'src/infrastructure/controllers/actors/dto/updateActor.dto';
import { Actor } from 'src/infrastructure/entities/actor.entity';

export class ActorsUseCases {
  constructor(
    // private readonly logger: ILogger,
    private readonly actorRepository: IActorRepository,
  ) {}

  async create(dto: CreateActorDto): Promise<Actor> {
    return await this.actorRepository.insert(dto);
  }
  async update(id: number, dto: UpdateActorDto): Promise<void> {
    await this.actorRepository.update(id, dto);
  }
  async delete(id: number): Promise<void> {
    await this.actorRepository.deleteById(id);
  }

  async findOne(id: number): Promise<Actor | undefined> {
    const user = await this.actorRepository.findById(id);
    return user;
  }

  async findAll(): Promise<Actor[]> {
    return await this.actorRepository.findAll();
  }
}
