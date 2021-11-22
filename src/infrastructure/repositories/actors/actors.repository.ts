import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IActorRepository } from 'src/domain/repositories/actorRepository.interface';
import { CreateActorDto } from 'src/infrastructure/dto/actors/createActor.dto';
import { UpdateActorDto } from 'src/infrastructure/dto/actors/updateActor.dto';
import { Actor } from 'src/infrastructure/entities/actor.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class DatabaseActorsRepository implements IActorRepository {
  constructor(
    @InjectRepository(Actor)
    private readonly actorEntityRepository: Repository<Actor>,
  ) {}
  async findAllByID(ids: number[]): Promise<Actor[]> {
    return this.actorEntityRepository.find({ where: { id: In(ids) } });
  }

  async update(id: number, dto: UpdateActorDto): Promise<Actor> {
    // await this.actorEntityRepository.update({ id: id }, { ...dto });
    return await this.actorEntityRepository.findOne(id);
  }

  async insert(dto: CreateActorDto): Promise<Actor> {
    return await this.actorEntityRepository.save(dto);
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
