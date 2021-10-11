import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticationCredentialsDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/token')
  async signIn(@Body() credentialDto: AuthenticationCredentialsDto) {
    return this.authService.signIn(credentialDto);
  }
}
