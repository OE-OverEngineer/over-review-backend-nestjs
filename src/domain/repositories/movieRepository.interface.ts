import { Movie } from '../../infrastructure/entities/movie.entity';

export interface IMovieRepository {
  insert(movie: Movie): Promise<void>;
  // findAll(): Promise<MovieModel[]>;
  // findById(id: number): Promise<MovieModel>;
  // deleteById(id: number): Promise<void>;
}
