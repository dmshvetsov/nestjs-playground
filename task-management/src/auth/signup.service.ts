import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class SignupService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly authService: AuthService,
  ) {}

  async signUpUser(credentials: SignUpDto) {
    credentials.password = await this.authService.hashPassword(
      credentials.password,
    );
    return this.userRepository.saveNew(credentials);
  }
}
