import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  Patch,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateActorDto } from 'src/infrastructure/dto/actors/createActor.dto';
import { UpdateActorDto } from 'src/infrastructure/dto/actors/updateActor.dto';
import { ActorsUseCases } from 'src/usecases/actors/actors.usecase';

@ApiTags('Actors')
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

  @Patch('/:id')
  update(@Param('id') id: number, @Body() dto: UpdateActorDto) {
    return this.actorsUsecases.update(id, dto);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.actorsUsecases.delete(id);
  }
}
