import { CreateRoleDto } from 'src/infrastructure/controllers/roles/dto/createRole.dto';
import { Role } from 'src/infrastructure/entities/role.entity';

export interface IRoleRepository {
  insert(dto: CreateRoleDto): Promise<Role>;
  findAll(): Promise<Role[]>;
  updateById(): Promise<Role>;
  deleteById(): Promise<Role>;
}
