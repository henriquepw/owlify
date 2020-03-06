import request from 'supertest';
import bcrypt from 'bcryptjs';
import faker from 'faker';

import app from '../../app';

import User from '../models/User';

import getToken from '../../util/tests/getToken';
import factory from '../../util/tests/factories';

describe('User', () => {
  const path = '/users';

  describe('POST /users', () => {
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
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('PUT /users', () => {
    const auth = {
      user: {},
      token: '',
    } as {
      user: User;
      token: string;
    };

    beforeAll(async () => {
      auth.user = await factory.create<User>('User');
      auth.token = `Bearer ${auth.user.generateToken()}`;
    });

    it('should not be able to update user data if not login', async () => {
      const { name } = await factory.attrs<User>('User');

      const response = await request(app)
        .put(path)
        .send({
          name,
        });

      expect(response.status).toBe(401);
    });

    it('should be able to update user data', async () => {
      const newData = {
        name: faker.name.findName(),
        email: faker.internet.email(),
      };

      const response = await request(app)
        .put(path)
        .set('Authorization', auth.token)
        .send(newData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining(newData));
    });

    it('should return an bad request error if the new email is already registered', async () => {
      const { email } = await factory.create<User>('User');

      const response = await request(app)
        .put(path)
        .set('Authorization', auth.token)
        .send({
          email,
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return an unauthorized error if oldPassword not match', async () => {
      const response = await request(app)
        .put(path)
        .set('Authorization', auth.token)
        .send({
          oldPassword: '1',
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('DELETE /users', () => {
    it('should be able to delete user from database', async () => {
      const response = await request(app)
        .delete(path)
        .set('Authorization', await getToken())
        .send();

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        deleted: 1,
      });
    });

    it('should not be able to delete user if not login', async () => {
      const response = await request(app)
        .delete(path)
        .send();

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });
  });
});
