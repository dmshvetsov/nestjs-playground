import { Injectable, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid';
import { GetTasksFilterDto, UpdateTaskStatusDto } from './dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getList(filter: GetTasksFilterDto) {
    let list = this.tasks.slice();
    if (filter.status) {
      list = list.filter((item) => item.status === filter.status);
    }
    if (filter.q) {
      const searchQuery = filter.q.toLowerCase();
      list = list.filter(
        (item) =>
          item.status.toLowerCase().includes(searchQuery) ||
          item.description.toLowerCase().includes(searchQuery),
      );
    }
    return list;
  }

  getById(taskId: string) {
    const task = this.tasks.find((item) => item.id === taskId);
    if (!task) {
      throw new NotFoundException('task not found');
    }

    return task;
  }

  create(createDto: CreateTaskDto): Task {
    const newTask: Task = {
      ...createDto,
      id: uuid.v4(),
      status: TaskStatus.OPEN,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  updateStatus(updateDto: UpdateTaskStatusDto): Task {
    const taskToUpdate = this.getById(updateDto.id);
    taskToUpdate.status = updateDto.status;
    return taskToUpdate;
  }

  delete(taskId: string) {
    const idx = this.tasks.findIndex((item) => item.id === taskId);
    const deletedTask = this.tasks[idx];
    this.tasks = [...this.tasks.slice(0, idx), ...this.tasks.slice(idx + 1)];
    return deletedTask;
  }
}
