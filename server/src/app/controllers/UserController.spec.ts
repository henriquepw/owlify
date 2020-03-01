import request from 'supertest';
import bcrypt from 'bcryptjs';

import app from '../../app';

import factory from '../../util/tests/factories';
import { cleanPostgres } from '../../util/tests/cleanDB';
import User from '../models/User';

describe('User', () => {
  const path = '/users';

  beforeEach(async () => {
    await cleanPostgres();
  });

  /**
   * Tests for create user
   */
  it('should be able to register a user', async () => {
    const user = await factory.attrs<User>('User');

    const response = await request(app)
      .post(path)
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
      .post(path)
      .send(user);

    const response = await request(app)
      .post(path)
      .send(user);

    expect(response.status).toBe(400);
  });

  // /**
  //  * Tests for update user data
  //  */
  // it('should be able to update user data', async () => {
  //   const userFactory = await factory.attrs<User>('User');

  //   const { body: user } = await request(app)
  //     .post(path)
  //     .send(userFactory);

  //   const response = await request(app)
  //     .put(path)
  //     .send({ id: user.id, name: 'Henrique' });

  //   expect(response.body).toMatchObject({
  //     ...user,
  //     name: 'Henrique',
  //   });
  // });

  /**
   * Tests for delete user
   */
  it('should be able to delete user from database', async () => {
    const userFactory = await factory.attrs<User>('User');

    const user = await request(app)
      .post(path)
      .send(userFactory);

    const response = await request(app)
      .delete(path)
      .send({ id: user.body.id });

    expect(response.status).toBe(200);

    expect(response.body).toMatchObject({
      deleted: 1,
    });
  });

  it('should not be able to detele user if not pass the id', async () => {
    const response = await request(app)
      .delete(path)
      .send();

    expect(response.status).toBe(400);

    expect(response.body).toHaveProperty('error');
  });

  it('should not be able to detele user if user not exist', async () => {
    const response = await request(app)
      .delete(path)
      .send({ id: 4 });

    expect(response.status).toBe(400);

    expect(response.body).toHaveProperty('error');
  });
});
