import { IReportRepository } from 'src/domain/repositories/reportRepository.interface';
import { IReviewRepository } from 'src/domain/repositories/reviewRepository.interface';
import { Pagination } from 'src/infrastructure/dto/pagination/pagination.dto';
import { CreateReportDto } from 'src/infrastructure/dto/reports/createReport.dto';
import { UpdateReportDto } from 'src/infrastructure/dto/reports/updateReport.dto';
import { CreateReviewDto } from 'src/infrastructure/dto/reviews/createReview.dto';
import { UpdateReviewDto } from 'src/infrastructure/dto/reviews/updateReview.dto';
import { Report } from 'src/infrastructure/entities/report.entity';
import { Review } from 'src/infrastructure/entities/review.entity';

export class ReportsUsecase {
  constructor(private readonly reportRepository: IReportRepository) {}

  async create(dto: CreateReportDto, userID: number): Promise<Report> {
    return await this.reportRepository.insert(dto, userID);
  }

  // async update(id: number, dto: UpdateReportDto): Promise<Report> {
  //   return await this.reportRepository.update(dto, id);
  // }

  async delete(id: number): Promise<void> {
    await this.reportRepository.deleteById(id);
  }

  async findOne(id: number): Promise<Report> {
    const review = await this.reportRepository.findById(id);
    return review;
  }

  async findAll(): Promise<Report[]> {
    return await this.reportRepository.findAll();
  }

  // async findAllByMovieID(
  //   movieID: number,
  //   pagination: Pagination,
  // ): Promise<Report[]> {
  //   // if (pagination.)
  //   return await this.reportRepository.findAllByMovieID(movieID, pagination);
  // }

  // async findAllByUserID(
  //   userID: number,
  //   pagination: Pagination,
  // ): Promise<Report[]> {
  //   // if (pagination.)
  //   return await this.reportRepository.findAllByUserID(userID, pagination);
  // }
}
