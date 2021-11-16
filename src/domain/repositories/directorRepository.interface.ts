import { CreateDirectorDto } from 'src/infrastructure/controllers/directors/dto/createDirector.dto';
import { UpdateDirectorDto } from 'src/infrastructure/controllers/directors/dto/updateDirector.dto';
import { Director } from 'src/infrastructure/entities/director.entity';

export interface IDirectorRepository {
  insert(dto: CreateDirectorDto): Promise<Director>;
  findAll(): Promise<Director[]>;
  findById(id: number): Promise<Director>;
  update(id: number, dto: UpdateDirectorDto): Promise<Director>;
  deleteById(id: number): Promise<void>;
}
