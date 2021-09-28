import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { UpdateTaskStatusDto } from './dto';
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
