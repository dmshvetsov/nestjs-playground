import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupController } from './signup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { SignupService } from './signup.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  providers: [AuthService, SignupService],
  controllers: [SignupController],
})
export class AuthModule {}
