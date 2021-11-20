import { BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { IActorRepository } from 'src/domain/repositories/actorRepository.interface';
import { IDirectorRepository } from 'src/domain/repositories/directorRepository.interface';
import { IMovieRepository } from 'src/domain/repositories/movieRepository.interface';

import { Pagination } from 'src/infrastructure/controllers/pagination/dto/pagination.dto';
import { CreateMovieDto } from 'src/infrastructure/dto/movies/createMovie.dto';
import { UpdateMovieDto } from 'src/infrastructure/dto/movies/updateMovie.dto';
import { Movie } from 'src/infrastructure/entities/movie.entity';

export class MoviesUseCases {
  constructor(
    // private readonly logger: ILogger,
    private readonly movieRepository: IMovieRepository,
    private readonly actorRepository: IActorRepository,
    private readonly directorRepository: IDirectorRepository,
  ) {}

  async create(dto: CreateMovieDto): Promise<void> {
    // const director = await this.directorRepository.findById(dto.directorID);
    // if (!director) throw new BadRequestException('Director not found');
    // const actors = await this.actorRepository.findAllByID(dto.actorsID);
    // if (!actors || actors.length != dto.actorsID.length)
    //   throw new BadRequestException('Actors not found ');
    console.log('test');
    // const erorrs = await validate(dto);
    // if (erorrs.length != 0) {
    //   erorrs.forEach(console.log);
    // } else {
    //   await this.movieRepository.insert(dto);
    // }
    await this.movieRepository.insert(dto);
  }

  async requestByUser(dto: CreateMovieDto, userID: number): Promise<void> {
    const director = await this.directorRepository.findById(dto.directorID);
    if (!director) throw new BadRequestException('Director not found');
    const actors = await this.actorRepository.findAllByID(dto.actorsID);
    if (!actors || actors.length != dto.actorsID.length)
      throw new BadRequestException('Actors not found ');
    await this.movieRepository.insert(dto, userID);
  }

  async update(id: number, dto: UpdateMovieDto): Promise<void> {
    await this.movieRepository.update(id, dto);
  }

  async delete(id: number): Promise<void> {
    await this.movieRepository.deleteById(id);
  }

  async findOne(id: number): Promise<Movie | undefined> {
    if (id < 0) throw new BadRequestException('');
    const movie = await this.movieRepository.findById(id);
    return movie;
  }

  async findAll(pagintaion: Pagination): Promise<Movie[]> {
    return await this.movieRepository.findAll(pagintaion);
  }

  async findCategoryMovie(
    categoryID: number,
    pagintaion: Pagination,
  ): Promise<Movie[]> {
    return await this.movieRepository.findByCategory(pagintaion, categoryID);
  }

  async search(searchText: string, pagintaion: Pagination): Promise<Movie[]> {
    return await this.movieRepository.findAllBySearch(searchText, pagintaion);
  }
}
