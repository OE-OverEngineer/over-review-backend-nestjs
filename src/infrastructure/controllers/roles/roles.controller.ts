import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from 'src/infrastructure/dto/roles/createRole.dto';
import { RolesUseCases } from 'src/usecases/roles/roles.usecase';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesUseCase: RolesUseCases) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesUseCase.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.rolesUseCase.findAll();
  }
}
