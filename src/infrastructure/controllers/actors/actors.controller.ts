import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt-auth.guard';
import { Role } from 'src/infrastructure/auth/role.enum';
import { Roles } from 'src/infrastructure/auth/roles.decorator';
import { RolesGuard } from 'src/infrastructure/auth/roles.guard';
import { CreateActorDto } from 'src/infrastructure/dto/actors/createActor.dto';
import { UpdateActorDto } from 'src/infrastructure/dto/actors/updateActor.dto';
import { ActorsUseCases } from 'src/usecases/actors/actors.usecase';

@ApiTags('Actors')
@Controller('actors')
export class ActorsController {
  constructor(private readonly actorsUsecases: ActorsUseCases) {}

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  create(@Body() dto: CreateActorDto) {
    return this.actorsUsecases.create(dto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.actorsUsecases.findAll();
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch('/:id')
  update(@Param('id') id: number, @Body() dto: UpdateActorDto) {
    return this.actorsUsecases.update(id, dto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.actorsUsecases.delete(id);
  }
}
