import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DirectorsUseCases } from 'src/usecases/directors.usecase';
import { CreateDirectorDto } from './dto/createDirector.dto';

@Controller('directors')
export class DirectorsController {
  constructor(private readonly directorsUsecases: DirectorsUseCases) {}
  @Post()
  create(@Body() createMovieDto: CreateDirectorDto) {
    console.log(createMovieDto);
    return this.directorsUsecases.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.directorsUsecases.findAll();
  }
}
