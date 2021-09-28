import { TaskStatus } from '../task';

type SearchQuery = string;

export class GetTasksFilterDto {
  status: TaskStatus;
  q: SearchQuery;
}
