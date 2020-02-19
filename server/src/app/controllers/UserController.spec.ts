import request from 'supertest';
import bcrypt from 'bcryptjs';

import app from '../../app';

import factory from '../../util/tests/factories';
import { cleanPostgres } from '../../util/tests/cleanDB';
import User from '../models/User';

describe('User', () => {
  beforeEach(async () => {
    await cleanPostgres();
  });

  it('should be able to register a user', async () => {
    const user = await factory.attrs<User>('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('should encrypt user password when new user created', async () => {
    const user = await factory.create<User>('User', {
      password: '123',
    });

    const compareHash = await bcrypt.compare('123', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('should not be able to register with duplicated email', async () => {
    const user = await factory.attrs<User>('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });
});
