import { ApiProperty } from '@nestjs/swagger';

export class Pagination {
  @ApiProperty()
  perPage: number;

  @ApiProperty()
  pageNum: number;

  @ApiProperty({ nullable: true, required: false })
  sortBy?: string;
}
