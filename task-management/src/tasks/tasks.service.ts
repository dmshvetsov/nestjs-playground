import { Injectable } from '@nestjs/common';
import { GetTasksFilterDto, UpdateTaskStatusDto } from './dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  getUserList(user: User, filter: GetTasksFilterDto) {
    return this.tasksRepository.findForUser(user.id, filter);
  }

  getUserTask(user: User, taskId: string): Promise<Task> {
    return this.tasksRepository.findOneForUser(user.id, taskId);
  }

  createForUser(user: User, createDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.saveOpen({
      ...createDto,
      user,
    });
  }

  async updateStatus(
    user,
    taskId: string,
    updateDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const taskToUpdate = await this.getUserTask(user.id, taskId);
    taskToUpdate.status = updateDto.status;
    await this.tasksRepository.save(taskToUpdate);
    return taskToUpdate;
  }

  async delete(user: User, taskId: string): Promise<Task> {
    const taskToDelete = await this.getUserTask(user, taskId);
    return this.tasksRepository.remove(taskToDelete);
  }
}
