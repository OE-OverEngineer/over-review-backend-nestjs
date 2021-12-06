import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt-auth.guard';
import { Role } from 'src/infrastructure/auth/role.enum';
import { Roles } from 'src/infrastructure/auth/roles.decorator';
import { RolesGuard } from 'src/infrastructure/auth/roles.guard';
import { CreateDirectorDto } from 'src/infrastructure/dto/directors/createDirector.dto';
import { DirectorsUseCases } from 'src/usecases/directors/directors.usecase';

@ApiTags('Directors')
@Controller('directors')
export class DirectorsController {
  constructor(private readonly directorsUsecases: DirectorsUseCases) {}
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  create(@Body() createMovieDto: CreateDirectorDto) {
    return this.directorsUsecases.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.directorsUsecases.findAll();
  }
}
