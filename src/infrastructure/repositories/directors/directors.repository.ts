import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IDirectorRepository } from 'src/domain/repositories/directorRepository.interface';
import { CreateDirectorDto } from 'src/infrastructure/controllers/directors/dto/createDirector.dto';
import { UpdateDirectorDto } from 'src/infrastructure/controllers/directors/dto/updateDirector.dto';
import { Director } from 'src/infrastructure/entities/director.entity';

import { Repository } from 'typeorm';

@Injectable()
export class DatabaseDirectorsRepository implements IDirectorRepository {
  constructor(
    @InjectRepository(Director)
    private readonly directorEntityRepository: Repository<Director>,
  ) {}
  async insert(dto: CreateDirectorDto): Promise<void> {
    await this.directorEntityRepository.save(dto);
  }
  async findAll(): Promise<Director[]> {
    return this.directorEntityRepository.find();
  }

  async findById(id: number): Promise<Director> {
    return this.directorEntityRepository.findOne(id);
  }
  async update(id: number, dto: UpdateDirectorDto): Promise<void> {
    await this.directorEntityRepository.update({ id: id }, { ...dto });
  }

  async deleteById(id: number): Promise<void> {
    await this.directorEntityRepository.delete(id);
  }
}
