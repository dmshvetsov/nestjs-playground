import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationCredentialsDto } from './dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UsersRepository) {}

  async hashPassword(password: string) {
    return bcrypt.hash(password, await bcrypt.genSalt());
  }

  async signIn(credentials: AuthenticationCredentialsDto) {
    const user = await this.userRepository.findByUsername(credentials.username);
    if (user && (await bcrypt.compare(credentials.password, user.password))) {
      return 'some-auth-token';
    }

    throw new UnauthorizedException('username or password is wrong');
  }
}
