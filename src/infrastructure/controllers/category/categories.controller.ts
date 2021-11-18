import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateCategoryDto } from 'src/infrastructure/dto/category/createCategory.dto';
import { CategoriesUseCases } from 'src/usecases/categories/categories.usecase';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesUseCases: CategoriesUseCases) {}
  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.categoriesUseCases.create(dto);
  }

  @Get()
  findAll() {
    return this.categoriesUseCases.findAll();
  }
}
