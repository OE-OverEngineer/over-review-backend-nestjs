import { IDirectorRepository } from 'src/domain/repositories/directorRepository.interface';
import { CreateDirectorDto } from 'src/infrastructure/controllers/directors/dto/createDirector.dto';
import { Director } from 'src/infrastructure/entities/director.entity';

export class DirectorsUseCases {
  constructor(
    // private readonly logger: ILogger,
    private readonly directorRepository: IDirectorRepository,
  ) {}

  async create(dto: CreateDirectorDto): Promise<void> {
    await this.directorRepository.insert(dto);
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
  async findAll(): Promise<Director[]> {
    return await this.directorRepository.findAll();
  }
}
