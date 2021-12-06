import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { ICategoryRepository } from 'src/domain/repositories/categoriesRepository.interface';
import { CreateCategoryDto } from 'src/infrastructure/dto/category/createCategory.dto';
import { UpdateCategoryDto } from 'src/infrastructure/dto/category/updateCategory.dto';
import { Category } from 'src/infrastructure/entities/category.entity';

export class CategoriesUseCases {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async create(dto: CreateCategoryDto): Promise<void> {
    const category = await this.findByTitle(dto.title);
    if (category) throw new ConflictException('category already existed');
    else await this.categoryRepository.insert(dto);
  }
  async update(id: number, dto: UpdateCategoryDto): Promise<void> {
    const category = await this.findOne(id);

    /* TO CHECK IS CATEGORY ALREADY EXISTED */
    if (!category) throw new NotFoundException('category not found');
    const categoryTitle = await this.findByTitle(dto.title);

    /* TO CHECK IS TITLE ALREADY EXISTED */
    if (categoryTitle) throw new ConflictException('category already existed');
    else await this.categoryRepository.update(id, dto);
  }
  async delete(id: number): Promise<void> {
    const category = await this.findOne(id);
    if (!category) throw new NotFoundException('category not found');
    else await this.categoryRepository.deleteById(id);
  }

  async findOne(id: number): Promise<Category> {
    if (id < 0) throw new BadRequestException();
    const category = await this.categoryRepository.findById(id);
    return category;
  }

  async findByTitle(title: string): Promise<Category> {
    if (!title) throw new BadRequestException();
    const category = await this.categoryRepository.findByTitle(title);
    return category;
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.findAll();
  }

  async findAllByID(ids: number[]): Promise<Category[]> {
    return await this.categoryRepository.findAllByID(ids);
  }
}
