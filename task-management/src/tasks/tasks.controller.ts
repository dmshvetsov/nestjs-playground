import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDto, UpdateTaskStatusDto } from './dto';
import { Task } from './task';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAll(): Task[] {
    return this.tasksService.getAll();
  }

  @Get('/:taskId')
  get(@Param('taskId') taskId: string): Task {
    return this.tasksService.getById(taskId);
  }

  @Post()
  create(@Body() createDto: CreateTaskDto): Task {
    return this.tasksService.create(createDto);
  }

  @Patch('/:taskId/status')
  updateStatus(
    @Param('taskId') taskId: string,
    @Body() updateDto: UpdateTaskStatusDto,
  ): Task {
    updateDto.id = taskId;
    return this.tasksService.updateStatus(updateDto);
  }

  @Delete('/:taskId')
  delete(@Param('taskId') taskId: string): Task {
    return this.tasksService.delete(taskId);
  }
}
