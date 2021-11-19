import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICategoryRepository } from 'src/domain/repositories/categoriesRepository.interface';
import { CreateCategoryDto } from 'src/infrastructure/dto/category/createCategory.dto';
import { UpdateCategoryDto } from 'src/infrastructure/dto/category/updateCategory.dto';
import { Category } from 'src/infrastructure/entities/category.entity';

import { In, Repository } from 'typeorm';

@Injectable()
export class DatabaseCategoryRepository implements ICategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryEntityRepository: Repository<Category>,
  ) {}

  async findByTitle(title: string): Promise<Category | undefined> {
    return this.categoryEntityRepository.findOne({ where: { title: title } });
  }
  async findAllByID(ids: number[]): Promise<Category[]> {
    return this.categoryEntityRepository.find({ where: { id: In(ids) } });
  }

  async update(id: number, dto: UpdateCategoryDto): Promise<Category> {
    // await this.categoryEntityRepository.save({ id: id }, { ...dto });
    return await this.categoryEntityRepository.findOne(id);
  }

  async insert(dto: CreateCategoryDto): Promise<Category> {
    return await this.categoryEntityRepository.save(dto);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryEntityRepository.find();
  }

  async findById(id: number): Promise<Category | undefined> {
    return this.categoryEntityRepository.findOne({ id });
  }

  async deleteById(id: number): Promise<void> {
    await this.categoryEntityRepository.delete(id);
  }
}
