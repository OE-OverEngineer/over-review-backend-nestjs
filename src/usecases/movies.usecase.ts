import { BadRequestException } from '@nestjs/common';
import { IActorRepository } from 'src/domain/repositories/actorRepository.interface';
import { IDirectorRepository } from 'src/domain/repositories/directorRepository.interface';
import { IMovieRepository } from 'src/domain/repositories/movieRepository.interface';
import { IUsersRepository } from 'src/domain/repositories/userRepository.interface';
import { CreateMovieDto } from 'src/infrastructure/controllers/movies/dto/createMovie.dto';
import { CreateUserDto } from 'src/infrastructure/controllers/users/dto/createUser.dto';
import { Movie } from 'src/infrastructure/entities/movie.entity';
import { User } from 'src/infrastructure/entities/user.entity';

export class MoviesUseCases {
  constructor(
    // private readonly logger: ILogger,
    private readonly movieRepository: IMovieRepository,
    private readonly actorRepository: IActorRepository,
    private readonly directorRepository: IDirectorRepository,
  ) {}

  async create(dto: CreateMovieDto): Promise<void> {
    const director = await this.directorRepository.findById(dto.directorID);
    if (!director) throw new BadRequestException('Director not found');
    const actors = await this.actorRepository.findAllByID(dto.actorsID);
    if (!actors || actors.length != dto.actorsID.length)
      throw new BadRequestException('Actors not found ');
    await this.movieRepository.insert(dto);
  }
  //   async update(id:number , dto: CreateUserDto): Promise<void> {
  //     await this.movieRepository.create(dto);
  //   }
  //   async delete(dto: CreateUserDto): Promise<void> {
  //     await this.movieRepository.create(dto);
  //   }

  //   async findOne(id: number): Promise<User | undefined> {
  //     const user = await this.movieRepository.findById(id);
  //     return user;
  //   }
  async findAll(): Promise<Movie[]> {
    return await this.movieRepository.findAll();
  }
}
