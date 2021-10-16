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
import { GetCurrentUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';
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
  get(@Param('taskId') taskId: string): Promise<Task> {
    return this.tasksService.getById(taskId);
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
  ): Promise<Task> {
    return this.tasksService.updateStatus(taskId, updateDto);
  }

  @Delete('/:taskId')
  delete(@Param('taskId') taskId: string): Promise<Task> {
    return this.tasksService.delete(taskId);
  }
}
