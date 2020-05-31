import faker from 'faker';

import FakeGatewaysRepository from '@modules/gateways/repositories/fakes/FakeGatewaysRepository';

import FakeEndnodesRepository from '../repositories/fakes/FakeEndnodesRepository';
import ListUserEndnodesService from './ListUserEndnodesService';

let fakeEndnodesRepository: FakeEndnodesRepository;
let fakeGatewaysRepository: FakeGatewaysRepository;

let listUserEndnodes: ListUserEndnodesService;

// TODO: To refactor later
describe('List User Endnodes', () => {
  beforeEach(async () => {
    fakeGatewaysRepository = new FakeGatewaysRepository();
    fakeEndnodesRepository = new FakeEndnodesRepository();

    listUserEndnodes = new ListUserEndnodesService(fakeEndnodesRepository);
  });

  it('should be able to list all user endnodes', async () => {
    const gateway = await fakeGatewaysRepository.create({
      ownerId: faker.random.uuid(),
      location: faker.random.locale(),
    });

    fakeEndnodesRepository.gateways.push(gateway);

    const promises = Array.from({ length: 3 }, () =>
      fakeEndnodesRepository.create({
        room: faker.random.locale(),
        name: faker.random.word(),
        gatewayId: gateway.id,
      }),
    );

    promises.push(
      fakeEndnodesRepository.create({
        room: faker.random.locale(),
        name: faker.random.word(),
        gatewayId: 'another-gateway-id',
      }),
    );

    const expectEndnodes = await Promise.all(promises);

    const endnodes = await listUserEndnodes.execute({
      ownerId: gateway.ownerId,
    });

    expect(endnodes).toEqual(expectEndnodes.slice(0, 3));
  });

  it('should be able to list user endnodes with pagination', async () => {
    const gateway = await fakeGatewaysRepository.create({
      ownerId: faker.random.uuid(),
      location: faker.random.locale(),
    });

    fakeEndnodesRepository.gateways.push(gateway);

    const promises = Array.from({ length: 3 }, () =>
      fakeEndnodesRepository.create({
        room: faker.random.locale(),
        name: faker.random.word(),
        gatewayId: gateway.id,
      }),
    );

    promises.push(
      fakeEndnodesRepository.create({
        room: faker.random.locale(),
        name: faker.random.word(),
        gatewayId: 'another-gateway-id',
      }),
    );

    const expectEndnodes = await Promise.all(promises);

    const endnodes = await listUserEndnodes.execute({
      ownerId: gateway.ownerId,
      options: {
        page: 1,
        limit: 2,
      },
    });

    expect(endnodes).toEqual(expectEndnodes.slice(0, 2));
  });
});
