import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationCredentialsDto, UserDto } from './dto';
import { SignupService } from './signup.service';

@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post()
  async signUp(
    @Body() credentialDto: AuthenticationCredentialsDto,
  ): Promise<UserDto> {
    const user = await this.signupService.signUpUser(credentialDto);
    Reflect.deleteProperty(user, 'password');
    return user;
  }
}
