import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategoriesUseCases } from 'src/usecases/categories.usecase';
import { CreateCategoryDto } from './dto/createCategory.dto';

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
