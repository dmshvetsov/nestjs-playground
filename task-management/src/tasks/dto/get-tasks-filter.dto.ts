import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task';

type SearchQuery = string;

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsOptional()
  @IsString()
  q: SearchQuery;
}
