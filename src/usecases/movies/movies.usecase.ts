import { BadRequestException } from '@nestjs/common';
import { IMovieRepository } from 'src/domain/repositories/movieRepository.interface';
import { IUsersRepository } from 'src/domain/repositories/userRepository.interface';
import { CreateMovieDto } from 'src/infrastructure/dto/movies/createMovie.dto';
import { UpdateMovieDto } from 'src/infrastructure/dto/movies/updateMovie.dto';
import { Pagination } from 'src/infrastructure/dto/pagination/pagination.dto';
import { Movie } from 'src/infrastructure/entities/movie.entity';

export class MoviesUseCases {
  constructor(
    private readonly movieRepository: IMovieRepository,
    private readonly userRepository: IUsersRepository,
  ) {}

  async create(dto: CreateMovieDto): Promise<Movie> {
    // await this.validateCreate(dto);
    return await this.movieRepository.insert(dto);
  }

  async requestByUser(dto: CreateMovieDto, userID: number): Promise<Movie> {
    // await this.validateCreate(dto);
    const user = await this.userRepository.findById(userID);
    if (!user) throw new BadRequestException('User not found');
    return await this.movieRepository.insert(dto, userID);
  }

  async update(id: number, dto: UpdateMovieDto): Promise<Movie> {
    return await this.movieRepository.update(id, dto);
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

  // async validateCreate(dto: CreateMovieDto): Promise<void> {
  //   const director = await this.directorRepository.findById(dto.directorID);
  //   if (!director) throw new BadRequestException('Director not found');
  //   const actors = await this.actorRepository.findAllByID(dto.actorsID);
  //   if (!actors || actors.length != dto.actorsID.length)
  //     throw new BadRequestException('Actors not found');
  //   const categories = await this.categoryRepository.findAllByID(
  //     dto.categoriesID,
  //   );
  //   if (!categories || categories.length != dto.categoriesID.length)
  //     throw new BadRequestException('Categories not found');
  // }
}
