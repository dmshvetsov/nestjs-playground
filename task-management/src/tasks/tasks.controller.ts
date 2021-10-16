import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateTaskDto, GetTasksFilterDto, UpdateTaskStatusDto } from './dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getList(
    @Query() filter: GetTasksFilterDto,
    @GetCurrentUser() currentUser: User,
  ): Promise<Task[]> {
    return this.tasksService.getUserList(currentUser, filter);
  }

  @Get('/:taskId')
  get(
    @Param('taskId') taskId: string,
    @GetCurrentUser() currentUser: User,
  ): Promise<Task> {
    return this.tasksService.getUserTask(currentUser, taskId);
  }

  @Post()
  create(
    @Body() createDto: CreateTaskDto,
    @GetCurrentUser() currentUser: User,
  ): Promise<Task> {
    return this.tasksService.createForUser(currentUser, createDto);
  }

  @Patch('/:taskId/status')
  updateStatus(
    @Param('taskId') taskId: string,
    @Body() updateDto: UpdateTaskStatusDto,
    @GetCurrentUser() currentUser: User,
  ): Promise<Task> {
    return this.tasksService.updateStatus(currentUser, taskId, updateDto);
  }

  @Delete('/:taskId')
  delete(
    @Param('taskId') taskId: string,
    @GetCurrentUser() currentUser: User,
  ): Promise<Task> {
    return this.tasksService.delete(currentUser, taskId);
  }
}
