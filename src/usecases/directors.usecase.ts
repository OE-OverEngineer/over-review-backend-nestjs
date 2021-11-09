import { BadRequestException } from '@nestjs/common';
import { IDirectorRepository } from 'src/domain/repositories/directorRepository.interface';
import { CreateDirectorDto } from 'src/infrastructure/controllers/directors/dto/createDirector.dto';
import { UpdateDirectorDto } from 'src/infrastructure/controllers/directors/dto/updateDirector.dto';
import { Director } from 'src/infrastructure/entities/director.entity';

export class DirectorsUseCases {
  constructor(
    // private readonly logger: ILogger,
    private readonly directorRepository: IDirectorRepository,
  ) {}

  async create(dto: CreateDirectorDto): Promise<void> {
    await this.directorRepository.insert(dto);
  }
  async update(id: number, dto: UpdateDirectorDto): Promise<void> {
    if (id < 0) throw new BadRequestException('Cannot find id < 0');
    await this.directorRepository.update(id, dto);
  }
  async delete(id: number): Promise<void> {
    if (id < 0) throw new BadRequestException('Cannot find id < 0');
    await this.directorRepository.deleteById(id);
  }

  async findOne(id: number): Promise<Director | undefined> {
    if (id < 0) throw new BadRequestException('Cannot find id < 0');
    const director = await this.directorRepository.findById(id);
    return director;
  }

  async findAll(): Promise<Director[]> {
    return await this.directorRepository.findAll();
  }
}
