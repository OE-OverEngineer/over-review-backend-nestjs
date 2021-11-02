import { Movie } from '../../infrastructure/entities/movie.entity';

export interface MovieRepository {
  insert(todo: Movie): Promise<void>;
  // findAll(): Promise<MovieModel[]>;
  // findById(id: number): Promise<MovieModel>;
  // deleteById(id: number): Promise<void>;
}
