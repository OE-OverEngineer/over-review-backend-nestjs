import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateActorDto } from 'src/infrastructure/dto/actors/createActor.dto';
import { ActorsUseCases } from 'src/usecases/actors.usecase';

@Controller('actors')
export class ActorsController {
  constructor(private readonly actorsUsecases: ActorsUseCases) {}
  @Post()
  create(@Body() dto: CreateActorDto) {
    return this.actorsUsecases.create(dto);
  }

  @Get()
  findAll() {
    return this.actorsUsecases.findAll();
  }
}
