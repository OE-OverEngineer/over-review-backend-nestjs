import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IActorRepository } from 'src/domain/repositories/actorRepository.interface';
import { CreateActorDto } from 'src/infrastructure/controllers/actors/dto/createActor.dto';
import { UpdateActorDto } from 'src/infrastructure/controllers/actors/dto/updateActor.dto';
import { Actor } from 'src/infrastructure/entities/actor.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class DatabaseActorRepository implements IActorRepository {
  constructor(
    @InjectRepository(Actor)
    private readonly actorEntityRepository: Repository<Actor>,
  ) {}
  async findAllByID(ids: number[]): Promise<Actor[]> {
    return this.actorEntityRepository.find({ where: { id: In(ids) } });
  }

  async update(id: number, dto: UpdateActorDto): Promise<void> {
    await this.actorEntityRepository.update({ id: id }, { ...dto });
  }

  async insert(dto: CreateActorDto): Promise<void> {
    await this.actorEntityRepository.save(dto);
  }

  async findAll(): Promise<Actor[]> {
    return this.actorEntityRepository.find();
  }

  async findById(id: number): Promise<Actor | undefined> {
    return this.actorEntityRepository.findOne({ id });
  }

  async deleteById(id: number): Promise<void> {
    await this.actorEntityRepository.delete(id);
  }
}