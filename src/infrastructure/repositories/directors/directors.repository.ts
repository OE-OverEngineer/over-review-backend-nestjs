import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IDirectorRepository } from 'src/domain/repositories/directorRepository.interface';
import { CreateDirectorDto } from 'src/infrastructure/dto/directors/createDirector.dto';
import { UpdateDirectorDto } from 'src/infrastructure/dto/directors/updateDirector.dto';
import { Director } from 'src/infrastructure/entities/director.entity';

import { Repository } from 'typeorm';

@Injectable()
export class DatabaseDirectorsRepository implements IDirectorRepository {
  constructor(
    @InjectRepository(Director)
    private readonly directorEntityRepository: Repository<Director>,
  ) {}
  async insert(dto: CreateDirectorDto): Promise<Director> {
    return await this.directorEntityRepository.save(dto);
  }
  async findAll(): Promise<Director[]> {
    return this.directorEntityRepository.find();
  }

  async findById(id: number): Promise<Director> {
    return this.directorEntityRepository.findOne(id);
  }
  async update(id: number, dto: UpdateDirectorDto): Promise<Director> {
    await this.directorEntityRepository.update(id, { ...dto });
    return this.directorEntityRepository.findOne(id);
  }

  async deleteById(id: number): Promise<void> {
    await this.directorEntityRepository.delete(id);
  }
}
