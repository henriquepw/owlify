import 'reflect-metadata';

import FakeSensorsRepository from '../repositories/fakes/FakeSensorsRepository';
import ListEndnodeSensorsService from './ListEndnodeSensorsService';

let listEndnodeSensors: ListEndnodeSensorsService;
let fakeSensorsRepository: FakeSensorsRepository;

const fields = {
  temperature: 5,
  humidity: 80,
  snr: 1,
  rssi: 1,
  count: 1,
  success: true,
};

describe('List Endnode Sensors', () => {
  beforeEach(() => {
    fakeSensorsRepository = new FakeSensorsRepository();
    listEndnodeSensors = new ListEndnodeSensorsService(fakeSensorsRepository);
  });

  it('shoud be able to list all endnode sensors', async () => {
    const endnodeId = 'endnode-id';

    const promises = Array.from({ length: 3 }, () =>
      fakeSensorsRepository.create({
        endnodeId: 'endnode-id',
        fields,
      }),
    );

    promises.push(
      fakeSensorsRepository.create({
        endnodeId: 'another-endnode-id',
        fields,
      }),
    );

    const expectSensors = await Promise.all(promises);

    const sensors = await listEndnodeSensors.execute(endnodeId);

    sensors.map(sensor => expect(sensor).toHaveProperty('time'));

    expect(sensors.length).toBe(3);

    expect(sensors).toEqual(
      expectSensors.slice(0, 3).map(sensor => expect.objectContaining(sensor)),
    );
  });

  it('should be able to list endnode sensors with pagination', async () => {
    const endnodeId = 'endnode-id';

    const promises = Array.from({ length: 3 }, () =>
      fakeSensorsRepository.create({
        endnodeId: 'endnode-id',
        fields,
      }),
    );

    promises.push(
      fakeSensorsRepository.create({
        endnodeId: 'another-endnode-id',
        fields,
      }),
    );

    const expectSensors = await Promise.all(promises);

    const sensors = await listEndnodeSensors.execute(endnodeId, {
      limit: 2,
    });

    sensors.map(sensor => expect(sensor).toHaveProperty('time'));

    expect(sensors.length).toBe(2);

    expect(sensors).toEqual(
      expectSensors.slice(0, 2).map(sensor => expect.objectContaining(sensor)),
    );
  });
});
