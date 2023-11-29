import { IsOptional } from 'class-validator';

export class Pagination {
  @IsOptional()
  limit: number;

  @IsOptional()
  offset: number;
}
