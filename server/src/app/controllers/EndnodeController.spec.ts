import request from 'supertest';

import app from '../../app';

import Endnode from '../models/Endnode';

import factory from '../../util/tests/factories';
import User from '../models/User';
import Gateway from '../models/Gateway';

interface Auth {
  user: User;
  token: string;
}

describe('End-node', () => {
  const path = '/endnodes';

  const auth = {
    user: {},
    token: '',
  } as Auth;

  let gateway: Gateway;

  beforeAll(async () => {
    auth.user = await factory.create<User>('User');
    auth.token = `Bearer ${auth.user.generateToken()}`;

    gateway = await factory.create<Gateway>('Gateway', {
      user_id: auth.user.id,
    });
  });

  describe('GET /endnodes', () => {
    it('should get a list limited by 2 of user end-nodes', async () => {
      const endnodes = await factory.createMany<Endnode>('Endnode', 2, {
        gateway_id: gateway.id,
      });

      await factory.create<Endnode>('Endnode', {
        gateway_id: gateway.id,
      });

      const response = await request(app)
        .get(`${path}/?limit=2`)
        .set('Authorization', auth.token)
        .send();

      expect(response.body.length).toBe(2);

      expect(response.body).toEqual(
        expect.arrayContaining(
          endnodes.map(({ room, name }) =>
            expect.objectContaining({ room, name }),
          ),
        ),
      );
    });
  });

  describe('GET /endnodes/:gatewayId', () => {
    it.todo("should get a list of all end-nodes of a user's gateway");
  });

  describe('POST /endnodes/:gatewayId', () => {
    it('should be able to registe a end-node', async () => {
      const endnode = await factory.attrs<Endnode>('Endnode');

      const response = await request(app)
        .post(`${path}/${gateway.id}`)
        .set('Authorization', auth.token)
        .send(endnode);

      expect(response.body).toHaveProperty('id');
    });

    it('should return an bad request error if gateway not exist', async () => {
      const { id: user_id } = await factory.attrs<User>('User');

      const endnode = await factory.attrs<Endnode>('Endnode');

      const { id: gatewayId } = await factory.attrs<Gateway>('Gateway', {
        user_id,
      });

      const response = await request(app)
        .post(`${path}/${gatewayId}`)
        .set('Authorization', auth.token)
        .send(endnode);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('PUT /endnodes/:id', () => {
    it('should be able to update a end-node data by id', async () => {
      const { id } = await factory.create<Endnode>('Endnode', {
        gateway_id: gateway.id,
      });

      const { room, name } = await factory.attrs<Endnode>('Endnode');

      const response = await request(app)
        .put(`${path}/${id}`)
        .set('Authorization', auth.token)
        .send({
          room,
          name,
        });

      expect(response.body).toEqual(
        expect.objectContaining({
          room,
          name,
        }),
      );
    });

    it('should return an unauthorized error if the end-node is not yours', async () => {
      const { id: user_id } = await factory.create<User>('User');

      const { id: gateway_id } = await factory.create<Gateway>('Gateway', {
        user_id,
      });

      const { id } = await factory.create<Endnode>('Endnode', {
        gateway_id,
      });

      const { room } = await factory.attrs<Endnode>('Endnode');

      const response = await request(app)
        .put(`${path}/${id}`)
        .set('Authorization', auth.token)
        .send({
          room,
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });

    it('should return an bad request error if end-node not exist', async () => {
      const { id } = await factory.attrs<Endnode>('Endnode', {
        gateway_id: gateway.id,
      });

      const response = await request(app)
        .put(`${path}/${id}`)
        .set('Authorization', auth.token)
        .send();

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('DELETE /endnodes/:id', () => {
    it('should be able to delete a end-node', async () => {
      const { id } = await factory.create<Endnode>('Endnode', {
        gateway_id: gateway.id,
      });

      const response = await request(app)
        .delete(`${path}/${id}`)
        .set('Authorization', auth.token)
        .send();

      expect(response.body).toEqual(
        expect.objectContaining({
          deleted: 1,
        }),
      );
    });

    it('should return an unauthorized error if the end-node is not yours', async () => {
      const { id: user_id } = await factory.create<User>('User');

      const { id: gateway_id } = await factory.create<Gateway>('Gateway', {
        user_id,
      });

      const { id } = await factory.create<Endnode>('Endnode', {
        gateway_id,
      });

      const response = await request(app)
        .delete(`${path}/${id}`)
        .set('Authorization', auth.token)
        .send();

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });
  });
});
