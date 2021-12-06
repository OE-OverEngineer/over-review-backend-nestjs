import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { IMovieRepository } from 'src/domain/repositories/movieRepository.interface';
import { CreateMovieDto } from 'src/infrastructure/dto/movies/createMovie.dto';
import { RequestMovieDto } from 'src/infrastructure/dto/movies/requestMovie.dto';
import { UpdateMovieDto } from 'src/infrastructure/dto/movies/updateMovie.dto';
import { Pagination } from 'src/infrastructure/dto/pagination/pagination.dto';
import { Actor } from 'src/infrastructure/entities/actor.entity';
import { Category } from 'src/infrastructure/entities/category.entity';
import { Director } from 'src/infrastructure/entities/director.entity';
import { Movie } from 'src/infrastructure/entities/movie.entity';
import { User } from 'src/infrastructure/entities/user.entity';
import { StorageService } from 'src/infrastructure/storage/storage.service';
import { In, Repository } from 'typeorm';

@Injectable()
export class DatabaseMovieRepository implements IMovieRepository {
  constructor(
    @InjectRepository(Movie)
    private readonly movieEntityRepository: Repository<Movie>,
    private readonly storageService: StorageService,
  ) {}
  async findRequestMovie(
    pagination: Pagination,
  ): Promise<{ data: Movie[]; total: number }> {
    const skip = (pagination.pageNum - 1) * pagination.perPage;
    const [data, total] = await this.movieEntityRepository.findAndCount({
      where: {
        approve: false,
      },
      take: pagination.perPage,
      skip: skip,
    });
    return { data, total };
  }

  async addRequestMovie(dto: RequestMovieDto, userID: number): Promise<void> {
    const movie = new Movie();
    const user = new User();
    movie.title = dto.title;
    user.id = userID;
    movie.description = dto.description;
    movie.startDate = dto.startDate;
    movie.requestByUser = user;
    movie.approve = false;
    await this.movieEntityRepository.insert(movie);
  }

  async update(id: number, dto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.dtoToMovie(dto);
    await this.movieEntityRepository.update(id, movie);
    return this.movieEntityRepository.findOne(id);
  }

  async insert(dto: CreateMovieDto): Promise<Movie> {
    const movie: Movie = await this.dtoToMovie(dto);
    return await this.movieEntityRepository.save(movie);
  }

  async findAll(
    pagination: Pagination,
  ): Promise<{ data: Movie[]; total: number }> {
    let sort: string | undefined;
    if (pagination.sort == 'random') sort = 'RANDOM()';
    else if (pagination.sort == 'popular') sort = 'count';
    else if (pagination.sort == 'recent') sort = 'movie.startDate';
    else if (pagination.sort == 'score') sort = 'movie.score';
    const skip = (pagination.pageNum - 1) * pagination.perPage;

    // console.log(sort);
    /* --- Query list movies that created --- */

    const { entities, raw } = await this.movieEntityRepository
      .createQueryBuilder('movie')
      .select('movie')
      .addSelect('"r"."count"', 'count')
      .leftJoin(
        `(SELECT "review"."movieId",COUNT("review".*) FROM review GROUP BY "review"."movieId")`,
        'r',
        '"r"."movieId" = movie.id',
      )
      .leftJoinAndSelect('movie.categories', 'categories')
      .where('approve = :approve', { approve: true })
      .take(pagination.perPage)
      .offset(skip)
      .orderBy(sort, 'DESC')
      .getRawAndEntities();
    // console.log(entities);

    // const { entities, raw } = await this.movieEntityRepository
    //   .createQueryBuilder('movie')
    //   .select('movie')
    //   .addSelect('COUNT(reviews.score)', 'count')
    //   .leftJoin('movie.reviews', 'reviews')
    //   .where('approve = :approve', { approve: true })
    //   .groupBy('movie.id')
    //   .limit(pagination.perPage)
    //   .offset(skip)
    //   .orderBy(sort, 'DESC')
    //   .getRawAndEntities();
    // console.log(entities);
    // console.log(raw);
    /* --- Query total again because get RawMany cannot return count --- */
    const total = await this.movieEntityRepository.count({
      where: {
        approve: true,
      },
    });
    const ids = raw.map(({ movie_id }) => movie_id);
    // const movies = await this.movieEntityRepository.find({
    //   where: { id: In(ids) },

    //   // order: { sort },
    //   // relations: ['director', 'actors', 'categories'],
    // });
    const data = entities.map((e) => {
      return {
        ...e,
        reviewCount: Number(
          Number(raw.find((i) => i.movie_id == e.id).count).toFixed(0),
        ),
      };
    });

    return { data, total };
  }
  async findByCategory(
    pagination: Pagination,
    categoryID: number,
  ): Promise<{ data: Movie[]; total: number }> {
    const skip = (pagination.pageNum - 1) * pagination.perPage;
    const [result, total] = await this.movieEntityRepository
      .createQueryBuilder('movie')
      .select('movie.id')
      .addSelect('movie.startDate')
      .leftJoin('movie.categories', 'category')
      .where('category.id = :categoryID', { categoryID: categoryID })
      // .groupBy('movie.id')
      .orderBy('movie.startDate')
      .take(pagination.perPage)
      .skip(skip)
      .getManyAndCount();
    const resultID = result.map((e) => e.id);

    const data = await this.movieEntityRepository.find({
      where: {
        id: In(resultID),
      },
      relations: ['categories'],
    });
    return { data, total };
  }

  async findById(id: number): Promise<Movie> {
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
    return movie;
  }

  async findAllBySearch(
    searchText: string,
    pagination: Pagination,
  ): Promise<{ data: Movie[]; total: number }> {
    const [data, total] = await this.movieEntityRepository
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
      .take(pagination.perPage)
      .skip(pagination.pageNum - 1)
      .getManyAndCount();
    return { data, total };
    // return [];
  }

  async deleteById(id: number): Promise<void> {
    await this.movieEntityRepository.delete(id);
  }

  private async dtoToMovie(
    dto: CreateMovieDto | UpdateMovieDto,
  ): Promise<Movie> {
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
    const randomString = dto.title + String(Date.now());
    const bannerImageUrlBlob = await this.storageService.uploadAvatar(
      dto.bannerImage,
      randomString,
    );
    const newMovie = { ...dto, bannerImageUrl: bannerImageUrlBlob };
    const movie: Movie = {
      ...newMovie,
      // bannerImage: dto.bannerImageUrl,
      categories: categories,
      director: director,
      actors: actors,
      approve: true,
    };
    return movie;
  }
}
