import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CreateMovieDto } from 'src/infrastructure/dto/movies/createMovie.dto';
import { Pagination } from 'src/infrastructure/dto/pagination/pagination.dto';
import { MoviesUseCases } from 'src/usecases/movies.usecase';

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
