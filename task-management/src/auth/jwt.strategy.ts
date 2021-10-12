import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthPayload } from './dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UsersRepository) {
    super({
      secretOrKey: 'insecurely-stored-secret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: AuthPayload): Promise<User> {
    const user = this.userRepository.findByUsername(payload.username);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
