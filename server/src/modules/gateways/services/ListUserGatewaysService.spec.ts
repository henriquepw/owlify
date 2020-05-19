import faker from 'faker';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import FakeGatewaysRepository from '../repositories/fakes/FakeGatewaysRepository';

import ListUserGatewaysService from './ListUserGatewaysService';

let fakeUsersRepository: FakeUsersRepository;
let fakeGatewaysRepository: FakeGatewaysRepository;

let listUserGateways: ListUserGatewaysService;

describe('List User Gateways', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeGatewaysRepository = new FakeGatewaysRepository();

    listUserGateways = new ListUserGatewaysService(fakeGatewaysRepository);
  });

  it('should be able to list all user gateways', async () => {
    const { id: ownerId } = await fakeUsersRepository.create({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    const promises = Array.from({ length: 3 }, () =>
      fakeGatewaysRepository.create({
        location: faker.random.word(),
        ownerId,
      }),
    );

    promises.push(
      fakeGatewaysRepository.create({
        location: faker.random.word(),
        ownerId: 'another-user-id',
      }),
    );

    const expectGateways = await Promise.all(promises);

    const gateways = await listUserGateways.execute(ownerId);

    expect(gateways).toEqual(expectGateways.slice(0, 3));
  });
});
