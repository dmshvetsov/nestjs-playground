import { EntityRepository, Repository } from 'typeorm';
import { GetTasksFilterDto } from './dto';
import { TaskStatus } from './task';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  findList(filter: GetTasksFilterDto) {
    const qb = this.createQueryBuilder('tasks');
    if (filter.status) {
      qb.andWhere('tasks.status = :status', { status: filter.status });
    }
    if (filter.q) {
      qb.andWhere('tasks.title ilike :q or tasks.description ilike :q', {
        q: `%${filter.q}%`,
      });
    }
    return qb.execute();
  }

  saveOpen(params: Partial<Task>): Promise<Task> {
    const task = this.create({
      ...params,
      status: TaskStatus.OPEN,
    });
    return this.save(task);
  }
}
