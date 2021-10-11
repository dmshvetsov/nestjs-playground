import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async hashPassword(password: string) {
    return bcrypt.hash(password, await bcrypt.genSalt());
  }
}
