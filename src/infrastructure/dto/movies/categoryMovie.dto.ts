import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty({ nullable: true, required: false })
  category?: number;
}
