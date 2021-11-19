import { ICategoryRepository } from 'src/domain/repositories/categoriesRepository.interface';
import { CreateCategoryDto } from 'src/infrastructure/dto/category/createCategory.dto';
import { UpdateCategoryDto } from 'src/infrastructure/dto/category/updateCategory.dto';
import { Category } from 'src/infrastructure/entities/category.entity';

export class CategoriesUseCases {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async create(dto: CreateCategoryDto): Promise<void> {
    await this.categoryRepository.insert(dto);
  }
  async update(id: number, dto: UpdateCategoryDto): Promise<void> {
    await this.categoryRepository.update(id, dto);
  }
  async delete(id: number): Promise<void> {
    await this.categoryRepository.deleteById(id);
  }

  async findOne(id: number): Promise<Category | undefined> {
    const category = await this.categoryRepository.findById(id);
    return category;
  }

  async findByTitle(title: string): Promise<Category | undefined> {
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
