import { IActorRepository } from 'src/domain/repositories/actorRepository.interface';
import { CreateActorDto } from 'src/infrastructure/controllers/actors/dto/createActor.dto';
import { Actor } from 'src/infrastructure/entities/actor.entity';

export class ActorsUseCases {
  constructor(
    // private readonly logger: ILogger,
    private readonly actorRepository: IActorRepository,
  ) {}

  async create(dto: CreateActorDto): Promise<void> {
    await this.actorRepository.insert(dto);
  }
  //   async update(id:number , dto: CreateUserDto): Promise<void> {
  //     await this.movieRepository.create(dto);
  //   }
  //   async delete(dto: CreateUserDto): Promise<void> {
  //     await this.movieRepository.create(dto);
  //   }

  //   async findOne(id: number): Promise<User | undefined> {
  //     const user = await this.movieRepository.findById(id);
  //     return user;
  //   }
  async findAll(): Promise<Actor[]> {
    return await this.actorRepository.findAll();
  }
}
