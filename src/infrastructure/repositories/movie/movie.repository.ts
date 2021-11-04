import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IMovieRepository } from 'src/domain/repositories/movieRepository.interface';
import { CreateMovieDto } from 'src/infrastructure/controllers/movies/dto/createMovie.dto';
import { UpdateMovieDto } from 'src/infrastructure/controllers/movies/dto/updateMovie.dto';
import { Actor } from 'src/infrastructure/entities/actor.entity';
import { Director } from 'src/infrastructure/entities/director.entity';
import { Movie } from 'src/infrastructure/entities/movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DatabaseMovieRepository implements IMovieRepository {
  constructor(
    @InjectRepository(Movie)
    private readonly movieEntityRepository: Repository<Movie>,
  ) {}

  async update(id: number, dto: UpdateMovieDto): Promise<void> {
    await this.movieEntityRepository.update({ id: id }, { ...dto });
  }

  async insert(dto: CreateMovieDto): Promise<void> {
    await this.movieEntityRepository.insert(dto);
  }

  async findAll(): Promise<Movie[]> {
    return this.movieEntityRepository.find();
  }

  async findById(id: number): Promise<Movie | undefined> {
    return this.movieEntityRepository.findOne({ id });
  }

  async deleteById(id: number): Promise<void> {
    await this.movieEntityRepository.delete(id);
  }

  private dtoToUser(dto: CreateMovieDto): Movie {
    const director: Director = new Director();
    director.id = dto.directorID;
    const actors = dto.actorsID.map((id) => {
      const actor: Actor = new Actor();
      actor.id = id;
      return actor;
    });
    const movie: Movie = {
      ...dto,
      director: director,
      actors: actors,
    };
    return movie;
  }
}
