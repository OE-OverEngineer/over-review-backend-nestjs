import { Controller, Get, Post, Body } from '@nestjs/common';
import { ActorsUseCases } from 'src/usecases/actors.usecase';
import { CreateActorDto } from './dto/createActor.dto';

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
