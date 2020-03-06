import request from 'supertest';

import app from '../../app';

import Gateway from '../models/Gateway';
import User from '../models/User';

import factory from '../../util/tests/factories';
// import { cleanPostgres } from '../../util/tests/cleanDB';

interface Auth {
  user: User;
  token: string;
}

describe('Gateway', () => {
  const path = '/gateways';

  const auth = {
    user: {},
    token: '',
  } as Auth;

  beforeAll(async () => {
    // await cleanPostgres();

    auth.user = await factory.create<User>('User');
    auth.token = `Bearer ${auth.user.generateToken()}`;
  });

  describe('GET /gateways', () => {
    it('should get a list of all user gateway', async () => {
      const gateway1 = await factory.attrs<Gateway>('Gateway');
      const gateway2 = await factory.attrs<Gateway>('Gateway');

      await request(app)
        .post(path)
        .set('Authorization', auth.token)
        .send({
          locate: gateway1.locate,
        });

      await request(app)
        .post(path)
        .set('Authorization', auth.token)
        .send({
          locate: gateway2.locate,
        });

      const response = await request(app)
        .get(path)
        .set('Authorization', auth.token)
        .send();

      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining(gateway1),
          expect.objectContaining(gateway2),
        ]),
      );
    });
  });

  describe('POST /gateways', () => {
    it('shoud be able to registe a gateway', async () => {
      const { locate } = await factory.attrs<Gateway>('Gateway');

      const response = await request(app)
        .post(path)
        .set('Authorization', auth.token)
        .send({
          locate,
        });

      expect(response.body).toHaveProperty('id');
    });
  });

  describe('PUT /gateways/:id', () => {
    it('should be able to update a gateway data by id', async () => {
      const gateway = await factory.create<Gateway>('Gateway', {
        user_id: auth.user.id,
      });

      const { locate } = await factory.attrs<Gateway>('Gateway');

      const response = await request(app)
        .put(`${path}/${gateway.id}`)
        .set('Authorization', auth.token)
        .send({
          locate,
        });

      expect(response.body).toEqual(
        expect.objectContaining({
          locate,
        }),
      );
    });

    it('should not be able to update a gateway that is not yours', async () => {
      const { id } = await factory.create<User>('User');

      const gateway = await factory.create<Gateway>('Gateway', {
        user_id: id,
      });

      const { locate } = await factory.attrs<Gateway>('Gateway');

      const response = await request(app)
        .put(`${path}/${gateway.id}`)
        .set('Authorization', auth.token)
        .send({
          locate,
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('DELETE /gateways/:id', () => {
    it('should be able to delete a gateway', async () => {
      const gateway = await factory.create<Gateway>('Gateway', {
        user_id: auth.user.id,
      });

      const response = await request(app)
        .delete(`${path}/${gateway.id}`)
        .set('Authorization', auth.token)
        .send();

      expect(response.body).toEqual(
        expect.objectContaining({
          deleted: 1,
        }),
      );
    });

    it('should not be able to delete a gateway if not yours', async () => {
      const { id } = await factory.create<User>('User');

      const gateway = await factory.create<Gateway>('Gateway', {
        user_id: id,
      });

      const response = await request(app)
        .delete(`${path}/${gateway.id}`)
        .set('Authorization', auth.token)
        .send();

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });
  });
});
