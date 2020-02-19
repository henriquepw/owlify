import request from 'supertest';

import app from '../../app';

import { cleanInflux } from '../../util/tests/cleanDB';
import { packageFactory } from '../../util/tests/factories';

describe('Package', () => {
  beforeAll(async () => {
    await cleanInflux();
  });

  it('should be able to register a package', async () => {
    const measurement = packageFactory();

    const response = await request(app)
      .post('/packages/test')
      .send(measurement);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(measurement);
  });

  it('should return status 500 if not provide a data', async () => {
    const response = await request(app).post('/packages/test');

    expect(response.status).toBe(500);
  });

  it('should return a list of all nodeID packages order by decrescent time', async () => {
    const measurement = packageFactory();

    await request(app)
      .post('/packages/test')
      .send(measurement);

    const response = await request(app).get('/packages/test');

    expect(response.body[0]).toMatchObject({ ...measurement, nodeID: 'test' });
  });

  it("should return an empty array if a nodeID doesn't have registered measurement", async () => {
    const response = await request(app).get('/packages/test1');

    expect(response.body).toEqual([]);
  });
});
