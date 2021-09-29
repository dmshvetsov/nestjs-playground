import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto, GetTasksFilterDto, UpdateTaskStatusDto } from './dto';
import { Task } from './task';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getList(@Query() filter: GetTasksFilterDto): Task[] {
    return this.tasksService.getList(filter);
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
    return this.tasksService.updateStatus(taskId, updateDto);
  }

  @Delete('/:taskId')
  delete(@Param('taskId') taskId: string): Task {
    return this.tasksService.delete(taskId);
  }
}
