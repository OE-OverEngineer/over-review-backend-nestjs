import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt-auth.guard';
import { Role } from 'src/infrastructure/auth/role.enum';
import { Roles } from 'src/infrastructure/auth/roles.decorator';
import { RolesGuard } from 'src/infrastructure/auth/roles.guard';
import { CreateCategoryDto } from 'src/infrastructure/dto/category/createCategory.dto';
import { CategoriesUseCases } from 'src/usecases/categories/categories.usecase';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesUseCases: CategoriesUseCases) {}

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.categoriesUseCases.create(dto);
  }

  @Get()
  findAll() {
    return this.categoriesUseCases.findAll();
  }
}
