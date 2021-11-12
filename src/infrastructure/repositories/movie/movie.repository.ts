import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { IMovieRepository } from 'src/domain/repositories/movieRepository.interface';
import { CreateMovieDto } from 'src/infrastructure/controllers/movies/dto/createMovie.dto';
import { UpdateMovieDto } from 'src/infrastructure/controllers/movies/dto/updateMovie.dto';
import { Pagination } from 'src/infrastructure/controllers/pagination/dto/pagination.dto';
import { Actor } from 'src/infrastructure/entities/actor.entity';
import { Director } from 'src/infrastructure/entities/director.entity';
import { Movie } from 'src/infrastructure/entities/movie.entity';
import { User } from 'src/infrastructure/entities/user.entity';
import { Like, Repository } from 'typeorm';

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

  async findAll(pagination: Pagination): Promise<Movie[]> {
    // TODO : ADD Pagination and filter and response pagination
    // const [score] = await this.movieEntityRepository
    //   .createQueryBuilder('movie')
    //   .select('movie')
    //   .addSelect('AVG(reviews.score)', 'score')
    //   .leftJoin('movie.reviews', 'reviews')
    //   .groupBy('movie.id')
    //   .getRawMany();
    // console.log(score);
    const movies = await this.movieEntityRepository.find({
      relations: ['director', 'actors', 'requestByUser'],
      take: pagination.perPage,
      skip: pagination.pageNum - 1,
    });
    console.log(movies);

    return movies;
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

  async findAllBySearch(
    searchText: string,
    pagination: Pagination,
  ): Promise<Movie[]> {
    const movieLists = await this.movieEntityRepository.find({
      relations: ['actors', 'director'],
      where: [
        {
          title: Like('%' + searchText + '%'),
        },
        // {
        //   actors: {
        //     firstName: Like('%' + searchText + '%'),
        //   },
        // },
        // {
        //   actors: {
        //     lastName: Like('%' + searchText + '%'),
        //   },
        // },
        {
          director: {
            firstName: Like('%' + searchText + '%'),
          },
        },
        {
          director: {
            lastName: Like('%' + searchText + '%'),
          },
        },
      ],
      skip: pagination.pageNum - 1,
      take: pagination.perPage,
    });

    return movieLists;
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
    console.log(user);
    const movie: Movie = {
      ...dto,
      director: director,
      actors: actors,
      requestByUser: userID ? user : undefined,
      approve: userID == undefined ?? true,
    };
    return movie;
  }
}
