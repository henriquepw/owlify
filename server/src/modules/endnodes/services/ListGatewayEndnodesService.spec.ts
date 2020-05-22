import faker from 'faker';

import FakeGatewaysRepository from '@modules/gateways/repositories/fakes/FakeGatewaysRepository';

import FakeEndnodesRepository from '../repositories/fakes/FakeEndnodesRepository';

import ListGatewayEndnodesService from './ListGatewayEndnodesService';

let fakeEndnodesRepository: FakeEndnodesRepository;
let fakeGatewaysRepository: FakeGatewaysRepository;

let listGatewayEndnodes: ListGatewayEndnodesService;

describe('List Gateway Endnode', () => {
  beforeEach(async () => {
    fakeGatewaysRepository = new FakeGatewaysRepository();
    fakeEndnodesRepository = new FakeEndnodesRepository();

    listGatewayEndnodes = new ListGatewayEndnodesService(
      fakeEndnodesRepository,
    );
  });

  it('should be able to list all gateway endnodes', async () => {
    const gateway = await fakeGatewaysRepository.create({
      ownerId: faker.random.uuid(),
      location: faker.random.locale(),
    });

    fakeEndnodesRepository.gateways.push(gateway);

    const length = 2;

    const promises = Array.from({ length }, () =>
      fakeEndnodesRepository.create({
        room: faker.random.locale(),
        name: faker.random.word(),
        gatewayId: gateway.id,
      }),
    );

    promises.push(
      ...Array.from({ length }, () =>
        fakeEndnodesRepository.create({
          room: faker.random.locale(),
          name: faker.random.word(),
          gatewayId: 'another-gatway-id',
        }),
      ),
    );

    const expectEndnodes = await Promise.all(promises);

    const endnodes = await listGatewayEndnodes.execute(gateway.id);

    expect(endnodes).toEqual(expectEndnodes.slice(0, length));
  });
});
