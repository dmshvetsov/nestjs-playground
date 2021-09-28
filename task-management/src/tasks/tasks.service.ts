import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAll() {
    return this.tasks;
  }

  getById(taskId: string) {
    return this.tasks.find((item) => item.id === taskId);
  }

  create(createTaskDto: CreateTaskDto): Task {
    const newTask: Task = {
      ...createTaskDto,
      id: uuid.v4(),
      status: TaskStatus.OPEN,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  delete(taskId: string) {
    const idx = this.tasks.findIndex((item) => item.id === taskId);
    const deletedTask = this.tasks[idx];
    this.tasks = [...this.tasks.slice(0, idx), ...this.tasks.slice(idx + 1)];
    return deletedTask;
  }
}
