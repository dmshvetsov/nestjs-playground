import { TaskStatus } from '../task';

export class UpdateTaskStatusDto {
  id: string;
  status: TaskStatus;
}
