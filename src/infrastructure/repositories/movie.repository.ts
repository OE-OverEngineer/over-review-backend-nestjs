import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieRepository } from '../../domain/repositories/movieRepository.interface';
import { Movie } from '../entities/movie.entity';

@Injectable()
export class DatabaseMovieRepository implements MovieRepository {
  constructor(
    @InjectRepository(Movie)
    private readonly movieEntityRepository: Repository<Movie>,
  ) {}

  // async insert(movie: MovieModel): Promise<void> {
  //   const todoEntity = this.toTodoEntity(movie);
  //   await this.todoEntityRepository.insert(todoEntity);
  // }
  async insert(movie: Movie): Promise<void> {
    return null;
  }
}
