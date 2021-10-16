import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

const appConfigModule = ConfigModule.forRoot({
  envFilePath: ['.env'],
});

const ormModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    url: configService.get('DB_CONNECTION'),
    autoLoadEntities: true,
    synchronize: true,
  }),
});

@Module({
  imports: [appConfigModule, ormModule, TasksModule, AuthModule],
})
export class AppModule {}
