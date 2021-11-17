import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRoleDto } from 'src/infrastructure/dto/roles/createRole.dto';
import { RoleUseCases } from 'src/usecases/roles.usecase';

@Controller('roles')
export class RolesController {
  constructor(private readonly roleUseCase: RoleUseCases) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleUseCase.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.roleUseCase.findAll();
  }
}
