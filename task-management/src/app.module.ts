import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

const ormModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 54321,
  database: 'task_management',
  username: 'postgres',
  password: 'postgres',
  autoLoadEntities: true,
  synchronize: true,
});

@Module({
  imports: [ormModule, TasksModule],
})
export class AppModule {}
