import request from 'supertest';

import app from '../../app';

describe('User', () => {
  it('should be able to register a user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Henrique',
        email: 'meee@thehenry.dev',
        password: '123',
      });

    expect(response.body).toHaveProperty('id');
  });
});
