import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { IMovieRepository } from 'src/domain/repositories/movieRepository.interface';
import { CreateMovieDto } from 'src/infrastructure/dto/movies/createMovie.dto';
import { UpdateMovieDto } from 'src/infrastructure/dto/movies/updateMovie.dto';
import { Pagination } from 'src/infrastructure/dto/pagination/pagination.dto';
import { Actor } from 'src/infrastructure/entities/actor.entity';
import { Category } from 'src/infrastructure/entities/category.entity';
import { Director } from 'src/infrastructure/entities/director.entity';
import { Movie } from 'src/infrastructure/entities/movie.entity';
import { User } from 'src/infrastructure/entities/user.entity';
import { In, Like, Repository } from 'typeorm';

@Injectable()
export class DatabaseMovieRepository implements IMovieRepository {
  constructor(
    @InjectRepository(Movie)
    private readonly movieEntityRepository: Repository<Movie>,
  ) {}

  async update(id: number, dto: UpdateMovieDto): Promise<Movie> {
    // await this.movieEntityRepository.update({ id: id }, { ...dto });
    return this.movieEntityRepository.findOne(id);
  }

  async insert(dto: CreateMovieDto, userID?: number): Promise<Movie> {
    const movie: Movie = this.dtoToMovie(dto, userID);
    return await this.movieEntityRepository.save(movie);
  }

  async findAll(pagination: Pagination): Promise<Movie[]> {
    // TODO : ADD Pagination and filter and response pagination
    let sort: string | undefined;
    if (pagination.sortBy == 'random') sort = 'RANDOM()';
    else if (pagination.sortBy == 'popular') sort = 'count';
    else if (pagination.sortBy == 'recent') sort = 'movie.startDate';
    /// ANCHOR IDk what top movies should work
    else if (pagination.sortBy == 'score') sort = 'score';
    const raw = await this.movieEntityRepository
      .createQueryBuilder('movie')
      .select('movie.id')
      .addSelect('COUNT(reviews.score)', 'count')
      .addSelect('AVG(reviews.score)', 'score')
      .leftJoin('movie.reviews', 'reviews')
      .groupBy('movie.id')
      .orderBy(sort)
      .getRawMany();
    const ids = raw.map(({ movie_id }) => movie_id);
    const movies = await this.movieEntityRepository.find({
      where: { id: In(ids) },
      relations: ['director', 'actors', 'categories'],
    });
    const response = movies.map((e) => {
      return {
        ...e,
        score: Number(
          Number(raw.find((i) => i.movie_id == e.id).score).toFixed(1),
        ),
      };
    });

    return response;
  }
  async findByCategory(
    pagination: Pagination,
    categoryID: number,
  ): Promise<Movie[]> {
    // FIXME not paginate
    const result = await this.movieEntityRepository
      .createQueryBuilder('movie')
      .select('movie.id')
      .leftJoin('movie.categories', 'category')
      .where('category.id = :categoryID', { categoryID: categoryID })
      .groupBy('movie.id')
      .orderBy('RANDOM()')
      .take(pagination.perPage)
      .skip(pagination.pageNum - 1)
      .getRawMany();
    const resultID = result.map((e) => e.movie_id);
    console.log(resultID);

    const moviesLists = await this.movieEntityRepository.find({
      where: {
        id: In(resultID),
      },
      relations: ['categories'],
    });
    return moviesLists;
  }

  async findById(id: number): Promise<Movie | undefined> {
    // const movieeee = await this.movieEntityRepository
    //   .createQueryBuilder('movie')
    //   .select('AVG(reviews.score)', 'score')
    //   .addSelect('movie')
    //   .leftJoin('movie.reviews', 'reviews')
    //   .groupBy('movie.id')
    //   .where('movie.id =:id', { id: id })
    //   .getRawOne();
    // const sd = await this.movieEntityRepository.create(movieeee);
    // console.log(movieeee);
    // console.log(sd);
    const movie = await this.movieEntityRepository.findOne({
      where: { id },
      relations: [
        'director',
        'actors',
        'requestByUser',
        'reviews',
        'categories',
      ],
    });
    // movie.score = score;
    return movie;
  }

  async findAllBySearch(
    searchText: string,
    pagination: Pagination,
  ): Promise<Movie[]> {
    const result = await this.movieEntityRepository
      .createQueryBuilder('movie')
      .leftJoin('movie.director', 'director')
      .leftJoin('movie.actors', 'actors')
      .leftJoinAndSelect('movie.categories', 'categories')
      .where('movie.title LIKE :search', { search: `%${searchText}%` })
      .orWhere('actors.firstName LIKE :search', {
        search: `%${searchText}%`,
      })
      .orWhere('actors.lastName LIKE :search', {
        search: `%${searchText}%`,
      })
      .orWhere('director.firstName LIKE :search', {
        search: `%${searchText}%`,
      })
      .orWhere('director.lastName LIKE :search', {
        search: `%${searchText}%`,
      })
      // .groupBy('movie.id')
      .take(pagination.perPage)
      .skip(pagination.pageNum - 1)
      .getMany();
    // console.log(result);

    // .getMany();
    // const movieLists = await this.movieEntityRepository.find({
    //   relations: ['actors', 'director'],
    //   where: [
    //     {
    //       title: Like('%' + searchText + '%'),
    //     },
    //     // {
    //     //   actors: {
    //     //     firstName: Like('%' + searchText + '%'),
    //     //   },
    //     // },
    //     // {
    //     //   actors: {
    //     //     lastName: Like('%' + searchText + '%'),
    //     //   },
    //     // },
    //     {
    //       director: {
    //         firstName: Like('%' + searchText + '%'),
    //       },
    //     },
    //     {
    //       director: {
    //         lastName: Like('%' + searchText + '%'),
    //       },
    //     },
    //   ],
    //   skip: pagination.pageNum - 1,
    //   take: pagination.perPage,
    // });

    return result;
    // return [];
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
    const categories = dto.categoriesID.map((id) => {
      const category: Category = new Category();
      category.id = id;
      return category;
    });
    const user: User = new User();

    user.id = userID;
    const movie: Movie = {
      ...dto,
      categories: categories,
      director: director,
      actors: actors,
      requestByUser: userID ? user : undefined,
      approve: userID == undefined ?? true,
    };
    return movie;
  }
}
