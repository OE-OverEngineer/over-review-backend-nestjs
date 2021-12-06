import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Request,
  UseGuards,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt-auth.guard';
import { Role } from 'src/infrastructure/auth/role.enum';
import { Roles } from 'src/infrastructure/auth/roles.decorator';
import { RolesGuard } from 'src/infrastructure/auth/roles.guard';
import { CreateMovieDto } from 'src/infrastructure/dto/movies/createMovie.dto';
import { RequestMovieDto } from 'src/infrastructure/dto/movies/requestMovie.dto';
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

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Member)
  @Post('/request')
  requestMovie(@Body() dto: RequestMovieDto, @Request() req) {
    const userID = Number(req.user.id);
    return this.moviesUsecases.requestByUser(dto, userID);
  }
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/request')
  findAllRequestMovie(@Query() pagintaion: Pagination) {
    return this.moviesUsecases.findRequestMovie(pagintaion);
  }

  @Get()
  findAll(@Query() pagintaion: Pagination) {
    return this.moviesUsecases.findAll(pagintaion);
  }

  @Get('/:id/reviews')
  findByCategory(@Query() pagintaion: Pagination, @Param('id') id: number) {
    return this.reviewUsecases.findAllByMovieID(id, pagintaion);
  }

  @Get('search')
  search(@Query('search') search: string, @Query() pagintaion: Pagination) {
    return this.moviesUsecases.search(search, pagintaion);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    const movidId = Number(id);
    return this.moviesUsecases.findOne(movidId);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete('/:id')
  deleteMovie(@Param('id') id: string) {
    const movieId = Number(id);
    const movie = this.moviesUsecases.findOne(movieId);
    if (!movie) throw new NotFoundException('movie not found');
    return this.moviesUsecases.delete(movieId);
  }
}
