import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationCredentialsDto } from './dto';
import { UsersRepository } from './users.repository';

@Controller('signup')
export class SignupController {
  constructor(private readonly userRepository: UsersRepository) {}

  @Post()
  signup(@Body() credentialDto: AuthenticationCredentialsDto) {
    return this.userRepository.saveNew(credentialDto);
  }
}
