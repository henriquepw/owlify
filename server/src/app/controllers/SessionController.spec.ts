import request from 'supertest';
import app from '../../app';

import User from '../models/User';

import factory from '../../util/tests/factories';
// import { cleanPostgres } from '../../util/tests/cleanDB';

describe('Session', () => {
  const path = '/sessions';

  let user: User;

  beforeAll(async () => {
    const password = '123';

    user = await factory.create<User>('User', {
      password,
    });
  });

  it('should login with correct data', async () => {
    const { id, email, name, password } = user;

    const response = await request(app)
      .post(path)
      .send({
        email,
        password,
      });

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('token');

    expect(response.body).toEqual(
      expect.objectContaining({
        user: {
          id,
          name,
          email,
        },
      }),
    );
  });

  it("should return an unauthorized error if provide a user doesn't exist", async () => {
    const { email, password } = await factory.attrs<User>('User');

    const response = await request(app)
      .post(path)
      .send({
        email,
        password,
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  it('should return an unauthorized error if provided an invalid password', async () => {
    const response = await request(app)
      .post(path)
      .send({
        email: user.email,
        password: '1',
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error');
  });
});
