import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
