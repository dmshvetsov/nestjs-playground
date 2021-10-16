import { Expose } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';

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

  @IsString()
  @Expose()
  DB_CONNECTION: string;
}
