import { IsString } from 'class-validator';

export class AuthenticationCredentialsDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
