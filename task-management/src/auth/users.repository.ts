import { EntityRepository, Repository } from 'typeorm';
import { AuthenticationCredentialsDto } from './dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  saveNew(credentials: AuthenticationCredentialsDto): Promise<User> {
    const user = this.create(credentials);
    return this.save<User>(user);
  }
}
