import request from 'supertest';

import app from '../../app';

import factory from './factories';
import User from '../../app/models/User';

async function getToken() {
  const { email, password } = await factory.create<User>('User');

  const { body } = await request(app)
    .post('/sessions')
    .send({
      email,
      password,
    });

  return `Bearer ${body.token}`;
}

export default getToken;
