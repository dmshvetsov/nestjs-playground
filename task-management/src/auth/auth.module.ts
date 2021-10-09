import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupController } from './signup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  providers: [AuthService],
  controllers: [SignupController],
})
export class AuthModule {}
