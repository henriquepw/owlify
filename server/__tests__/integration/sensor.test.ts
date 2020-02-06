import request from 'supertest';
import app from '../../src/app';

describe('Sensor', () => {
  it('should be able to register a sensor and package measurement', async () => {
    const measurement = {
      id: 1,
      snr: 10,
      rssi: 20,
      humidity: 60,
      temperature: 10,
    };

    const response = await request(app)
      .post('/sensors/test')
      .send(measurement);

    const getSensors = await request(app).get('/sensors/test');
    const getPackages = await request(app).get('/packages/test');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(measurement);

    expect(getSensors.body[0]).toMatchObject({
      host: 'test',
      temperature: measurement.temperature,
      humidity: measurement.humidity,
    });

    expect(getPackages.body[0]).toMatchObject({
      host: 'test',
      id: measurement.id,
      snr: measurement.snr,
      rssi: measurement.rssi,
      success: true,
    });
  });

  it('should return status 500 if not provide a data', async () => {
    const response = await request(app).post('/sensors/test');

    expect(response.status).toBe(500);
  });

  it("should return an empty array if a host doesn't have registered measurement", async () => {
    const response = await request(app).get('/sensors/test1');

    expect(response.body).toEqual([]);
  });
});
