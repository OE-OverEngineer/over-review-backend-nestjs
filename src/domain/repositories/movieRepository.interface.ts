import { CreateMovieDto } from 'src/infrastructure/controllers/movies/dto/createMovie.dto';
import { UpdateMovieDto } from 'src/infrastructure/controllers/movies/dto/updateMovie.dto';
import { Movie } from '../../infrastructure/entities/movie.entity';

export interface IMovieRepository {
  insert(dto: CreateMovieDto): Promise<void>;
  findAll(): Promise<Movie[]>;
  findById(id: number): Promise<Movie | undefined>;
  update(id: number, dto: UpdateMovieDto): Promise<void>;
  deleteById(id: number): Promise<void>;
}
