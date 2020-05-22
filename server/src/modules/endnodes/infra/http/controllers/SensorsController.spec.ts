import request from 'supertest';

import app from '@shared/infra/http/app';

import { cleanInflux } from '@shared/util/tests/cleanDB';
import { sensorFactory } from '@shared/util/tests/factories';

describe('Sensor', () => {
  beforeAll(async () => {
    await cleanInflux();
  });

  it('should be able to register a sensor and package measurement', async () => {
    const measurement = sensorFactory();

    const response = await request(app).post('/sensors/test').send(measurement);

    const getSensors = await request(app).get('/sensors/test');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(measurement);

    expect(getSensors.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          nodeID: 'test',
          temperature: measurement.temperature,
          humidity: measurement.humidity,
        }),
      ]),
    );
  });

  it('should return status 500 if not provide a data', async () => {
    const response = await request(app).post('/sensors/test');

    expect(response.status).toBe(500);
  });

  it("should return an empty array if a node id doesn't have registered measurement", async () => {
    const response = await request(app).get('/sensors/test1');

    expect(response.body).toEqual([]);
  });
});
