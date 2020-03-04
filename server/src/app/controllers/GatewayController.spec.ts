import request from 'supertest';

import app from '../../app';

import factory from '../../util/tests/factories';
import { cleanPostgres } from '../../util/tests/cleanDB';
import Gateway from '../models/Gateway';

import getToken from '../../util/tests/getToken';

describe('Gateway', () => {
  const path = '/gateways';
  const auth = {
    token: '',
  };

  beforeEach(async () => {
    await cleanPostgres();
    auth.token = await getToken();
  });

  /**
   * Testes for get
   */
  it('it should get a list of all user gateway', async () => {
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

  /**
   * Testes for get
   */
  it('shoud be able to registe a gateway', async () => {
    factory.cleanUp();
    const { locate } = await factory.attrs<Gateway>('Gateway');

    const gateway = await request(app)
      .post(path)
      .set('Authorization', auth.token)
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
