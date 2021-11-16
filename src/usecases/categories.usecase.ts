import { ICategoryRepository } from 'src/domain/repositories/categoriesRepository.interface';
import { CreateCategoryDto } from 'src/infrastructure/controllers/category/dto/createCategory.dto';
import { UpdateCategoryDto } from 'src/infrastructure/controllers/category/dto/updateCategory.dto';
import { Category } from 'src/infrastructure/entities/category.entity';

export class CategoriesUseCases {
  constructor(
    // private readonly logger: ILogger,
    private readonly categoriesRepository: ICategoryRepository,
  ) {}

  async create(dto: CreateCategoryDto): Promise<void> {
    await this.categoriesRepository.insert(dto);
  }
  async update(id: number, dto: UpdateCategoryDto): Promise<void> {
    await this.categoriesRepository.update(id, dto);
  }
  async delete(id: number): Promise<void> {
    await this.categoriesRepository.deleteById(id);
  }

  async findOne(id: number): Promise<Category | undefined> {
    const user = await this.categoriesRepository.findById(id);
    return user;
  }

  async findAll(): Promise<Category[]> {
    return await this.categoriesRepository.findAll();
  }
}
