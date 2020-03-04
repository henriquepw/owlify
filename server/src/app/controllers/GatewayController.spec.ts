import request from 'supertest';

import app from '../../app';

import factory from '../../util/tests/factories';
import { cleanPostgres } from '../../util/tests/cleanDB';
import Gateway from '../models/Gateway';
import User from '../models/User';

import getToken from '../../util/tests/getToken';

describe('Gateway', () => {
  const path = '/gateways';

  beforeEach(async () => {
    await cleanPostgres();
  });

  /**
   * Testes for get
   */
  it('it should get a list of all user gateway', async () => {
    const gateway1 = await factory.attrs<Gateway>('Gateway');
    const gateway2 = await factory.attrs<Gateway>('Gateway');

    const token = await getToken();

    await request(app)
      .post(path)
      .set('Authorization', token)
      .send({
        locate: gateway1.locate,
      });

    await request(app)
      .post(path)
      .set('Authorization', token)
      .send({
        locate: gateway2.locate,
      });

    const response = await request(app)
      .get(path)
      .set('Authorization', token)
      .send();

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining(gateway1),
        expect.objectContaining(gateway2),
      ]),
    );
  });

  /**
   * Testes for get
   */
  it('shoud be able to registe a gateway', async () => {
    const { locate } = await factory.attrs<Gateway>('Gateway');

    const gateway = await request(app)
      .post(path)
      .set('Authorization', await getToken())
      .send({
        locate,
      });

    expect(gateway.body).toHaveProperty('id');
  });

  /**
   * Testes for update
   */
  it.todo('should be able to update the gateway data');

  /**
   * Testes for delete
   */
  it.todo('should be able to delete a gateway');
});
