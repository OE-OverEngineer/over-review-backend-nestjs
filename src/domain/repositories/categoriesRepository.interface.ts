import { CreateCategoryDto } from 'src/infrastructure/dto/category/createCategory.dto';
import { UpdateCategoryDto } from 'src/infrastructure/dto/category/updateCategory.dto';
import { Category } from 'src/infrastructure/entities/category.entity';

export interface ICategoryRepository {
  insert(dto: CreateCategoryDto): Promise<Category>;
  findAll(): Promise<Category[]>;
  findAllByID(ids: number[]): Promise<Category[]>;
  findById(id: number): Promise<Category>;
  findByTitle(title: string): Promise<Category>;
  update(id: number, dto: UpdateCategoryDto): Promise<Category>;
  deleteById(id: number): Promise<void>;
}
