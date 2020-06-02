import faker from 'faker';

import AppError from '@shared/Errors/AppError';

import FakeGatewaysRepository from '@modules/gateways/repositories/fakes/FakeGatewaysRepository';

import FakeEndnodesRepository from '../repositories/fakes/FakeEndnodesRepository';
import UpdateEndnodeService from './UpdateEndnodeService';

let fakeEndnodesRepository: FakeEndnodesRepository;
let fakeGatewaysRepository: FakeGatewaysRepository;

let updateEndnode: UpdateEndnodeService;

let endnodeData = {
  name: '',
  room: '',
};

describe('Update Endnode', () => {
  beforeEach(async () => {
    fakeEndnodesRepository = new FakeEndnodesRepository();
    fakeGatewaysRepository = new FakeGatewaysRepository();

    updateEndnode = new UpdateEndnodeService(fakeEndnodesRepository);

    endnodeData = {
      name: faker.random.locale(),
      room: faker.random.locale(),
    };
  });

  it('should be able update a endnode', async () => {
    const gateway = await fakeGatewaysRepository.create({
      location: faker.random.word(),
      ownerId: faker.random.uuid(),
    });

    const endnode = await fakeEndnodesRepository.create({
      ...endnodeData,
      gatewayId: gateway.id,
    });

    fakeEndnodesRepository.gateways.push(gateway);

    const updatedEndnode = await updateEndnode.execute({
      ownerId: gateway.ownerId,
      endnodeId: endnode.id,
      name: 'new-name',
      room: 'new-room',
    });

    expect(updatedEndnode).toEqual(
      expect.objectContaining({
        name: 'new-name',
        room: 'new-room',
      }),
    );
  });

  it('shoud not be able to update a endnode if not yours', async () => {
    const gateway = await fakeGatewaysRepository.create({
      location: faker.random.word(),
      ownerId: 'another-user-id',
    });

    const endnode = await fakeEndnodesRepository.create({
      ...endnodeData,
      gatewayId: gateway.id,
    });

    fakeEndnodesRepository.gateways.push(gateway);

    await expect(
      updateEndnode.execute({
        ownerId: 'user-id',
        endnodeId: endnode.id,
        name: 'new-name',
        room: 'new-room',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud not be able to update a non-existing endnode', async () => {
    await expect(
      updateEndnode.execute({
        ownerId: 'user-id',
        endnodeId: 'non-existing-endnode',
        name: 'new-name',
        room: 'new-room',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
