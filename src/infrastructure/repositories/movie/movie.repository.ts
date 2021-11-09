import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { IMovieRepository } from 'src/domain/repositories/movieRepository.interface';
import { CreateMovieDto } from 'src/infrastructure/controllers/movies/dto/createMovie.dto';
import { UpdateMovieDto } from 'src/infrastructure/controllers/movies/dto/updateMovie.dto';
import { Actor } from 'src/infrastructure/entities/actor.entity';
import { Director } from 'src/infrastructure/entities/director.entity';
import { Movie } from 'src/infrastructure/entities/movie.entity';
import { User } from 'src/infrastructure/entities/user.entity';
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

  async insert(dto: CreateMovieDto, userID?: number): Promise<void> {
    const movie: Movie = this.dtoToMovie(dto, userID);
    await this.movieEntityRepository.save(movie);
  }

  async findAll(): Promise<Movie[]> {
    const [score] = await this.movieEntityRepository
      .createQueryBuilder('movie')
      .select('movie')
      .addSelect('AVG(reviews.score)', 'score')
      .leftJoin('movie.reviews', 'reviews')
      .groupBy('movie.id')
      .getRawMany();
    console.log(score);
    return this.movieEntityRepository.find({
      relations: ['director', 'actors', 'requestByUser'],
    });
  }

  async findById(id: number): Promise<Movie | undefined> {
    const { score } = await this.movieEntityRepository
      .createQueryBuilder('movie')
      .select('AVG(reviews.score)', 'score')
      .leftJoin('movie.reviews', 'reviews')
      .groupBy('movie.id')
      .where('movie.id =:id', { id: id })
      .getRawOne();
    const movie = await this.movieEntityRepository.findOne({
      where: { id },
      relations: ['director', 'actors', 'requestByUser', 'reviews'],
    });
    movie.score = score;
    return movie;
  }

  async deleteById(id: number): Promise<void> {
    await this.movieEntityRepository.delete(id);
  }

  private dtoToMovie(dto: CreateMovieDto, userID: number): Movie {
    const director: Director = new Director();
    director.id = dto.directorID;
    const actors = dto.actorsID.map((id) => {
      const actor: Actor = new Actor();
      actor.id = id;
      return actor;
    });
    const user: User = new User();
    user.id = userID;
    const movie: Movie = {
      ...dto,
      director: director,
      actors: actors,
      requestByUser: user,
      approve: userID == undefined ?? true,
    };
    return movie;
  }
}
