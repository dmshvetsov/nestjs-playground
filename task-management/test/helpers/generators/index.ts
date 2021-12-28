import { getCustomRepository } from 'typeorm';
import { User } from '../../../src/auth/user.entity';
import { UsersRepository } from '../../../src/auth/users.repository';

const user = (overrides?: Partial<User>) => {
  const repo = getCustomRepository(UsersRepository);
  const user = repo.create({
    username: 'user@example.com',
    password: '1:SuperSecret^',
    ...overrides,
  });
  return repo.save(user);
};

export const generate = {
  user,
};
