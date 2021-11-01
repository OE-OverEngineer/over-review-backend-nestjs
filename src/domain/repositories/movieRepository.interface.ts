import { MovieModel } from '../model/movie';

export interface MovieRepository {
  insert(todo: MovieModel): Promise<void>;
  // findAll(): Promise<MovieModel[]>;
  // findById(id: number): Promise<MovieModel>;
  // deleteById(id: number): Promise<void>;
}
