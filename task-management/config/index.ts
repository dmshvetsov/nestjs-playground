import { Expose, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export enum Environment {
  development = 'development',
  test = 'test',
  staging = 'staging',
  production = 'production',
}

export class Config {
  @IsEnum(Environment)
  @Expose({ name: 'NODE_ENV' })
  ENV: Environment;

  @IsNumber()
  @Expose()
  @Type(() => Number)
  APP_PORT: number;

  @IsString()
  @Expose()
  DB_CONNECTION: string;

  @IsString()
  @Expose()
  JWT_SECRET: string;
}
