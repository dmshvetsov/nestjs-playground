import { Module } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Config } from '../config';

const appConfigModule = ConfigModule.forRoot({
  envFilePath: ['.env'],
  validate: (data) => {
    const config = plainToClass(Config, data, {
      excludeExtraneousValues: true,
    });
    const errors = validateSync(config);
    if (errors.length) {
      throw new Error(`Configuration error: ${errors}`);
    }
    return config;
  },
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
