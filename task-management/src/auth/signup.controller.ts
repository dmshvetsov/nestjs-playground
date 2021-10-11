import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationCredentialsDto } from './dto';
import { SignupService } from './signup.service';

@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post()
  async signup(@Body() credentialDto: AuthenticationCredentialsDto) {
    const user = await this.signupService.signUpUser(credentialDto);
    Reflect.deleteProperty(user, 'password');
    return user;
  }
}
