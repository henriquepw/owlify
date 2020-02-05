import request from 'supertest';
import app from '../../src/app';

describe('Package', () => {
  it('should be able to register a package', async () => {
    const measurement = {
      id: 1,
      snr: 10,
      rssi: 20,
      success: false,
    };

    const response = await request(app)
      .post('/packages/test')
      .send(measurement);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(measurement);

    // influx.dropDatabase(process.env.DB_NAME);
  });

  it('should return status 500 if not provide a data', async () => {
    const response = await request(app)
      .post('/packages/test')
      .send();

    expect(response.status).toBe(500);
  });
});
