import { CreateActorDto } from 'src/infrastructure/dto/actors/createActor.dto';
import { Report } from 'src/infrastructure/entities/report.entity';

export interface IReportRepository {
  insert(dto: CreateActorDto, byUserID: number): Promise<Report>;
  findAll(): Promise<Report[]>;
  findAllByID(ids: number[]): Promise<Report[]>;
  findById(id: number): Promise<Report>;
  deleteById(id: number): Promise<void>;
}
