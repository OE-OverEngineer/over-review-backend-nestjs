import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { MoviesUseCases } from 'src/usecases/movies.usecase';
import { Pagination } from '../pagination/dto/pagination.dto';
import { CreateMovieDto } from './dto/createMovie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesUsecases: MoviesUseCases) {}
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesUsecases.create(createMovieDto);
  }

  @Get()
  findAll(@Query() pagintaion: Pagination) {
    return this.moviesUsecases.findAll(pagintaion);
  }

  @Get('/category/:id')
  findByCategory(@Query() pagintaion: Pagination, @Param('id') id: number) {
    return this.moviesUsecases.findCategoryMovie(id, pagintaion);
  }

  @Get('search')
  search(@Query('search') search: string, @Query() pagintaion: Pagination) {
    return this.moviesUsecases.search(search, pagintaion);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.moviesUsecases.findOne(id);
  }
}
