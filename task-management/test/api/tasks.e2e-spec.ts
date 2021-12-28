import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { TasksController } from '../../src/tasks/tasks.controller';
import { AppModule } from '../../src/app.module';
import { JwtService } from '@nestjs/jwt';
import { generate } from '../helpers/generators';
import * as db from '../helpers/db';

const authHeaders = (authData: { username: string }) => {
  const jwtService = new JwtService({ secret: 'test-secret' });
  const token = jwtService.sign({ username: authData.username });
  return { Authorization: `Bearer ${token}` };
};

describe(TasksController.name, () => {
  let server: any;

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    const app = testingModule.createNestApplication();
    await app.init();
    server = app.getHttpServer();
  });

  beforeEach(() => db.reset);

  describe('/GET tasks', () => {
    it('should return empty array when user has no tasks', async () => {
      const user = await generate.user();
      const { body, status } = await request(server)
        .get('/tasks')
        .set(authHeaders(user));

      expect(status).toBe(200);
      expect(body).toEqual([]);
    });
  });
});
