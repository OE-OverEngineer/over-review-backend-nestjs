import { CreateDirectorDto } from 'src/infrastructure/dto/directors/createDirector.dto';
import { UpdateDirectorDto } from 'src/infrastructure/dto/directors/updateDirector.dto';
import { Director } from 'src/infrastructure/entities/director.entity';

export interface IDirectorRepository {
  insert(newDirector: Director): Promise<Director>;
  findAll(): Promise<Director[]>;
  findById(id: number): Promise<Director>;
  update(id: number, dto: UpdateDirectorDto): Promise<Director>;
  deleteById(id: number): Promise<void>;
}
