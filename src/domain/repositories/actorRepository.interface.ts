import { UpdateActorDto } from 'src/infrastructure/dto/actors/updateActor.dto';
import { Actor } from 'src/infrastructure/entities/actor.entity';

export interface IActorRepository {
  insert(newActor: Actor): Promise<Actor>;
  findAll(): Promise<Actor[]>;
  findByName(firstName: string, lastName: string): Promise<Actor>;
  findAllByID(ids: number[]): Promise<Actor[]>;
  findById(id: number): Promise<Actor>;
  update(id: number, dto: UpdateActorDto): Promise<Actor>;
  deleteById(id: number): Promise<void>;
}
