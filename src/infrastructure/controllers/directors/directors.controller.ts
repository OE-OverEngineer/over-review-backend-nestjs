import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateDirectorDto } from 'src/infrastructure/dto/directors/createDirector.dto';
import { DirectorsUseCases } from 'src/usecases/directors/directors.usecase';

@ApiTags('Directors')
@Controller('directors')
export class DirectorsController {
  constructor(private readonly directorsUsecases: DirectorsUseCases) {}
  @Post()
  create(@Body() createMovieDto: CreateDirectorDto) {
    return this.directorsUsecases.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.directorsUsecases.findAll();
  }
}
