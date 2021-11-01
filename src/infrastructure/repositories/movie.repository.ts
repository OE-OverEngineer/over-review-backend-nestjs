import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieModel } from '../../domain/model/movie';
import { MovieRepository } from '../../domain/repositories/movieRepositoey.interface';
import { Movie } from '../entities/movie.entity';

@Injectable()
export class DatabaseMovieRepository implements MovieRepository {
  constructor(
    @InjectRepository(Todo)
    private readonly todoEntityRepository: Repository<Todo>,
  ) {}

  async insert(movie: MovieModel): Promise<void> {
    const todoEntity = this.toTodoEntity(movie);
    await this.todoEntityRepository.insert(todoEntity);
  }
}
