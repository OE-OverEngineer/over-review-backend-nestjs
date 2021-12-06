import { BadRequestException, NotFoundException } from '@nestjs/common';
import { IMovieRepository } from 'src/domain/repositories/movieRepository.interface';
import { IUsersRepository } from 'src/domain/repositories/userRepository.interface';
import { CreateMovieDto } from 'src/infrastructure/dto/movies/createMovie.dto';
import { RequestMovieDto } from 'src/infrastructure/dto/movies/requestMovie.dto';
import { UpdateMovieDto } from 'src/infrastructure/dto/movies/updateMovie.dto';
import { Pagination } from 'src/infrastructure/dto/pagination/pagination.dto';
import { Movie } from 'src/infrastructure/entities/movie.entity';
import { StorageService } from 'src/infrastructure/storage/storage.service';

export class MoviesUseCases {
  constructor(
    private readonly movieRepository: IMovieRepository,
    private readonly userRepository: IUsersRepository,
    private readonly storageService: StorageService,
  ) {}

  async create(dto: CreateMovieDto): Promise<Movie> {
    return await this.movieRepository.insert(dto);
  }

  async requestByUser(dto: RequestMovieDto, userID: number): Promise<void> {
    const user = await this.userRepository.findById(userID);
    if (!user) throw new NotFoundException('User not found');
    await this.movieRepository.addRequestMovie(dto, user.id);
  }

  async update(id: number, dto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.findOne(id);
    if (!movie) throw new NotFoundException('movie not found');
    else return await this.movieRepository.update(id, dto);
  }

  async delete(id: number): Promise<void> {
    const movie = this.findOne(id);
    if (!movie) throw new NotFoundException('movie not found');
    await this.movieRepository.deleteById(id);
  }

  async findOne(id: number): Promise<Movie> {
    if (id < 0) throw new BadRequestException();
    const movie = await this.movieRepository.findById(id);
    return movie;
  }

  async findRequestMovie(
    pagintaion: Pagination,
  ): Promise<{ data: Movie[]; total: number }> {
    if (pagintaion.perPage < 1 || pagintaion.pageNum < 1)
      throw new BadRequestException();
    return await this.movieRepository.findRequestMovie(pagintaion);
  }

  async findAll(
    pagination: Pagination,
    category?: number,
  ): Promise<{ data: Movie[]; total: number }> {
    if (category)
      return await this.movieRepository.findByCategory(pagination, category);
    else return await this.movieRepository.findAll(pagination);
  }

  async findCategoryMovie(
    categoryID: number,
    pagintaion: Pagination,
  ): Promise<{ data: Movie[]; total: number }> {
    return await this.movieRepository.findByCategory(pagintaion, categoryID);
  }

  async search(
    searchText: string,
    pagintaion: Pagination,
  ): Promise<{ data: Movie[]; total: number }> {
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
