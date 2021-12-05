import { CreateMovieDto } from 'src/infrastructure/dto/movies/createMovie.dto';
import { UpdateMovieDto } from 'src/infrastructure/dto/movies/updateMovie.dto';
import { Pagination } from 'src/infrastructure/dto/pagination/pagination.dto';
import { Movie } from '../../infrastructure/entities/movie.entity';

export interface IMovieRepository {
  insert(dto: CreateMovieDto): Promise<Movie>;
  addRequestMovie(title: string, userID: number): Promise<void>;
  findRequestMovie(
    pagination: Pagination,
  ): Promise<{ data: Movie[]; total: number }>;
  findAll(pagination: Pagination): Promise<{ data: Movie[]; total: number }>;
  findById(id: number): Promise<Movie>;
  update(id: number, dto: UpdateMovieDto): Promise<Movie>;
  deleteById(id: number): Promise<void>;
  findAllBySearch(
    searchText: string,
    pagination: Pagination,
  ): Promise<{ data: Movie[]; total: number }>;
  findByCategory(
    pagination: Pagination,
    categoryID: number,
  ): Promise<{ data: Movie[]; total: number }>;
}
