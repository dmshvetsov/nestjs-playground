import { Injectable } from '@nestjs/common';
import { GetTasksFilterDto, UpdateTaskStatusDto } from './dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksRepository } from './trasks.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  getList(filter: GetTasksFilterDto) {
    return this.tasksRepository.findList(filter);
  }

  getById(taskId: string): Promise<Task> {
    return this.tasksRepository.findOneOrFail(taskId);
  }

  create(createDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.saveOpen(createDto);
  }

  async updateStatus(
    taskId: string,
    updateDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const taskToUpdate = await this.getById(taskId);
    taskToUpdate.status = updateDto.status;
    await this.tasksRepository.save(taskToUpdate);
    return taskToUpdate;
  }

  async delete(taskId: string): Promise<Task> {
    const taskToDelete = await this.getById(taskId);
    return this.tasksRepository.remove(taskToDelete);
  }
}
