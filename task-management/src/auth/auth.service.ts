import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto, AuthenticationCredentialsDto, AuthPayload } from './dto';
import { UsersRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async hashPassword(password: string) {
    return bcrypt.hash(password, await bcrypt.genSalt());
  }

  async signIn(credentials: AuthenticationCredentialsDto): Promise<AuthDto> {
    const user = await this.userRepository.findByUsername(credentials.username);
    if (user && (await bcrypt.compare(credentials.password, user.password))) {
      const payload: AuthPayload = { username: credentials.username };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    }

    throw new UnauthorizedException('username or password is wrong');
  }
}
