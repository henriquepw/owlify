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

  beforeAll(async () => {
    auth.user = await factory.create<User>('User');
    auth.token = `Bearer ${auth.user.generateToken()}`;
  });

  describe('GET /endnodes', () => {
    it.todo('should get a list of all user end-nodes');
  });

  describe('GET /endnodes/:gatewayId', () => {
    it.todo("should get a list of all end-nodes of a user's gateway");
  });

  describe('POST /endnodes/:gatewayId', () => {
    it('shoud be able to registe a end-node', async () => {
      const endnode = await factory.attrs<Endnode>('Endnode');

      const { id: gatewayId } = await factory.create<Gateway>('Gateway', {
        user_id: auth.user.id,
      });

      const response = await request(app)
        .post(`${path}/${gatewayId}`)
        .set('Authorization', auth.token)
        .send(endnode);

      expect(response.body).toHaveProperty('id');
    });

    it('shoud not be able to registe a end-node if gateway not exist', async () => {
      const endnode = await factory.attrs<Endnode>('Endnode');

      const { id: gatewayId } = await factory.attrs<Gateway>('Gateway', {
        user_id: 'auth.user.id',
      });

      const response = await request(app)
        .post(`${path}/${gatewayId}`)
        .set('Authorization', auth.token)
        .send(endnode);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('PUT /endnodes/:id', () => {
    it('should be able to update a end-node data by id', async () => {
      const { id: gateway_id } = await factory.create<Gateway>('Gateway', {
        user_id: auth.user.id,
      });

      const { id } = await factory.create<Endnode>('Endnode', {
        gateway_id,
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

    it.todo('should not be able to update a end-node that is not yours');
  });

  describe('DELETE /endnodes/:id', () => {
    it.todo('should be able to delete a end-node');

    it.todo('should not be able to delete a end-node if not yours');
  });
});
