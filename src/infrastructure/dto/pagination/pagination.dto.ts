import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';

export class Pagination {
  @ApiProperty({ default: 10 })
  perPage: number;

  @ApiProperty({ default: 1 })
  pageNum: number;

  @ApiProperty({ nullable: true, required: false })
  sort?: string;
}
