import { ApiProperty } from '@nestjs/swagger';

export class Pagination {
  @ApiProperty()
  perPage: number;

  @ApiProperty()
  pageNum: number;

  @ApiProperty({ nullable: true })
  sort?: string;
}
