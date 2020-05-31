import 'reflect-metadata';

import FakeSensorsRepository from '../repositories/fakes/FakeSensorsRepository';
import WriteSensorService from './WriteSensorService';

let writePackage: WriteSensorService;
let fakeSensorsRepository: FakeSensorsRepository;

describe('Write Sensor', () => {
  beforeEach(() => {
    fakeSensorsRepository = new FakeSensorsRepository();
    writePackage = new WriteSensorService(fakeSensorsRepository);
  });

  it('shoud be able to write a sensor data on database', async () => {
    const measurement = {
      endnodeId: 'endnode-id',
      fields: {
        humidity: 40,
        temperature: 5,
        snr: 1,
        rssi: 1,
        count: 1,
        success: true,
      },
    };

    const response = await writePackage.execute(measurement);

    expect(response).toEqual({
      endnodeId: 'endnode-id',
      ...measurement.fields,
    });
  });
});
