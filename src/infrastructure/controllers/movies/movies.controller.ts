import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt-auth.guard';
import { CreateMovieDto } from 'src/infrastructure/dto/movies/createMovie.dto';
import { Pagination } from 'src/infrastructure/dto/pagination/pagination.dto';
import { MoviesUseCases } from 'src/usecases/movies/movies.usecase';
import { ReviewsUseCases } from 'src/usecases/reviews/reviews.usecase';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesUsecases: MoviesUseCases,
    private readonly reviewUsecases: ReviewsUseCases,
  ) {}
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesUsecases.create(createMovieDto);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/request')
  requestMovie(@Body() createMovieDto: CreateMovieDto, @Request() req: any) {
    const userID = Number(req.user.id);
    return this.moviesUsecases.requestByUser(createMovieDto, userID);
  }

  @Get()
  findAll(@Query() pagintaion: Pagination) {
    return this.moviesUsecases.findAll(pagintaion);
  }

  // @Get('/category/:id')
  // findByCategory(@Query() pagintaion: Pagination, @Param('id') id: number) {
  //   return this.moviesUsecases.findCategoryMovie(id, pagintaion);
  // }
  @Get('/:id/reviews')
  findByCategory(@Query() pagintaion: Pagination, @Param('id') id: number) {
    return this.reviewUsecases.findAllByMovieID(id, pagintaion);
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
