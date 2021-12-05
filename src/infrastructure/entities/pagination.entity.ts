import { ApiProperty } from '@nestjs/swagger';

export class Pagination<TData> {
  total: number;

  currentPage: number;

  nextPage?: number;

  prevPage?: number;

  data: TData[];
}
