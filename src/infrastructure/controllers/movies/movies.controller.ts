import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MoviesUseCases } from 'src/usecases/movies.usecase';
import { CreateMovieDto } from './dto/createMovie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesUsecases: MoviesUseCases) {}
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesUsecases.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.moviesUsecases.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.moviesUsecases.findOne(id);
  }
}
