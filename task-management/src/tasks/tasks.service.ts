import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { Task, TaskStatus } from './task';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAll() {
    return this.tasks;
  }

  create(title: string, description: string): Task {
    const newTask: Task = {
      id: uuid.v4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(newTask);
    return newTask;
  }
}
