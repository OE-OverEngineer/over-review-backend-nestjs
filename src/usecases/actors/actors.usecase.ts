import { BadRequestException, ConflictException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IActorRepository } from 'src/domain/repositories/actorRepository.interface';
import { CreateActorDto } from 'src/infrastructure/dto/actors/createActor.dto';
import { UpdateActorDto } from 'src/infrastructure/dto/actors/updateActor.dto';
import { Actor } from 'src/infrastructure/entities/actor.entity';
import { StorageService } from 'src/infrastructure/storage/storage.service';

export class ActorsUseCases {
  constructor(
    private readonly actorRepository: IActorRepository,
    private readonly storageService: StorageService,
  ) {}

  async create(dto: CreateActorDto): Promise<Actor> {
    const actor = await this.actorRepository.findByName(
      dto.firstName,
      dto.lastName,
    );
    if (actor) throw new ConflictException();
    else {
      const randomString = dto.firstName + String(Date.now());
      const actorUrlBlob = await this.storageService.uploadAvatar(
        dto.image,
        randomString,
      );
      const newActor: Actor = {
        ...dto,
        imageUrl: actorUrlBlob,
      };
      return await this.actorRepository.insert(newActor);
    }
  }
  async update(id: number, dto: UpdateActorDto): Promise<void> {
    const actor = await this.actorRepository.findById(id);
    if (!actor) throw new BadRequestException();
    else {
      actor.firstName = dto.firstName;
      actor.lastName = dto.lastName;
      if (
        dto.image &&
        !dto.image.includes('https://overreview.blob.core.windows.net/')
      ) {
        const randomString = dto.firstName + String(Date.now());
        const actorUrlBlob = await this.storageService.uploadAvatar(
          dto.image,
          randomString,
        );
        actor.imageUrl = actorUrlBlob;
      }
      await this.actorRepository.insert(actor);
    }
  }

  async delete(id: number): Promise<void> {
    await this.actorRepository.deleteById(id);
  }

  async findOne(id: number): Promise<Actor> {
    return await this.actorRepository.findById(id);
  }

  async findAll(): Promise<Actor[]> {
    return await this.actorRepository.findAll();
  }
  async findAllByID(ids: number[]): Promise<Actor[]> {
    return await this.actorRepository.findAllByID(ids);
  }
}
