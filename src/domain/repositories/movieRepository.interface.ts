import { CreateMovieDto } from 'src/infrastructure/controllers/movies/dto/createMovie.dto';
import { UpdateMovieDto } from 'src/infrastructure/controllers/movies/dto/updateMovie.dto';
import { Pagination } from 'src/infrastructure/controllers/pagination/dto/pagination.dto';
import { Movie } from '../../infrastructure/entities/movie.entity';

export interface IMovieRepository {
  insert(dto: CreateMovieDto, int?: number): Promise<void>;
  findAll(pagination: Pagination): Promise<Movie[]>;
  findById(id: number): Promise<Movie | undefined>;
  update(id: number, dto: UpdateMovieDto): Promise<void>;
  deleteById(id: number): Promise<void>;
  findAllBySearch(searchText: string, pagination: Pagination): Promise<Movie[]>;
  findByCategory(pagination: Pagination, categoryID: number): Promise<Movie[]>;
}
