import { CreateCategoryDto } from 'src/infrastructure/controllers/category/dto/createCategory.dto';
import { UpdateCategoryDto } from 'src/infrastructure/controllers/category/dto/updateCategory.dto';
import { Category } from 'src/infrastructure/entities/category.entity';

export interface ICategoryRepository {
  insert(dto: CreateCategoryDto): Promise<void>;
  findAll(): Promise<Category[]>;
  findAllByID(ids: number[]): Promise<Category[]>;
  findById(id: number): Promise<Category>;
  update(id: number, dto: UpdateCategoryDto): Promise<void>;
  deleteById(id: number): Promise<void>;
}
