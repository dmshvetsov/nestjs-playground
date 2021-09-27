import { Injectable } from '@nestjs/common';
import { Task } from './task';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }
}
