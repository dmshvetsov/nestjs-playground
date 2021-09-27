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

  create(createTaskDto: CreateTaskDto): Task {
    const newTask: Task = {
      ...createTaskDto,
      id: uuid.v4(),
      status: TaskStatus.OPEN,
    };
    this.tasks.push(newTask);
    return newTask;
  }
}
