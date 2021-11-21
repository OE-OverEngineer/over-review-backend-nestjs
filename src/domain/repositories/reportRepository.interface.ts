import { CreateActorDto } from 'src/infrastructure/dto/actors/createActor.dto';
import { CreateReportDto } from 'src/infrastructure/dto/reports/createReport.dto';
import { UpdateReportDto } from 'src/infrastructure/dto/reports/updateReport.dto';
import { Report } from 'src/infrastructure/entities/report.entity';

export interface IReportRepository {
  insert(dto: CreateReportDto, byUserID: number): Promise<Report>;
  // update(dto: UpdateReportDto, byUserID: number): Promise<Report>;
  findAll(): Promise<Report[]>;
  findAllByID(ids: number[]): Promise<Report[]>;
  findById(id: number): Promise<Report>;
  deleteById(id: number): Promise<void>;
}
