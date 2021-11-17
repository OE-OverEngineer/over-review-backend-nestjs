import { CreateMovieDto } from 'src/infrastructure/dto/movies/createMovie.dto';
import { UpdateMovieDto } from 'src/infrastructure/dto/movies/updateMovie.dto';
import { Pagination } from 'src/infrastructure/dto/pagination/pagination.dto';
import { Movie } from '../../infrastructure/entities/movie.entity';

export interface IMovieRepository {
  insert(dto: CreateMovieDto, int?: number): Promise<Movie>;
  findAll(pagination: Pagination): Promise<Movie[]>;
  findById(id: number): Promise<Movie | undefined>;
  update(id: number, dto: UpdateMovieDto): Promise<Movie>;
  deleteById(id: number): Promise<void>;
  findAllBySearch(searchText: string, pagination: Pagination): Promise<Movie[]>;
  findByCategory(pagination: Pagination, categoryID: number): Promise<Movie[]>;
}
