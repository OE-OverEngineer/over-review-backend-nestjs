import { CreateActorDto } from 'src/infrastructure/dto/actors/createActor.dto';
import { UpdateActorDto } from 'src/infrastructure/dto/actors/updateActor.dto';
import { Actor } from 'src/infrastructure/entities/actor.entity';

export interface IActorRepository {
  insert(dto: CreateActorDto): Promise<Actor>;
  findAll(): Promise<Actor[]>;
  findAllByID(ids: number[]): Promise<Actor[]>;
  findById(id: number): Promise<Actor>;
  update(id: number, dto: UpdateActorDto): Promise<Actor>;
  deleteById(id: number): Promise<void>;
}
