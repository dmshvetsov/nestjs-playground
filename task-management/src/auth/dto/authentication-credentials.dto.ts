import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { PASSWORD } from '../../lib/rexp';

export class AuthenticationCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(16)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @MaxLength(32)
  @Matches(PASSWORD, { message: 'password is too weak' })
  password: string;
}
