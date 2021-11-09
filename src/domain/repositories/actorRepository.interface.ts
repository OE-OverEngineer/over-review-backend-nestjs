import { CreateActorDto } from 'src/infrastructure/controllers/actors/dto/createActor.dto';
import { UpdateActorDto } from 'src/infrastructure/controllers/actors/dto/updateActor.dto';
import { Actor } from 'src/infrastructure/entities/actor.entity';

export interface IActorRepository {
  insert(dto: CreateActorDto): Promise<void>;
  findAll(): Promise<Actor[]>;
  findAllByID(ids: number[]): Promise<Actor[]>;
  findById(id: number): Promise<Actor>;
  update(id: number, dto: UpdateActorDto): Promise<void>;
  deleteById(id: number): Promise<void>;
}
