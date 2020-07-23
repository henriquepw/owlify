import faker from 'faker';

import AppError from '@shared/Errors/AppError';

import FakeGatewaysRepository from '@modules/gateways/repositories/fakes/FakeGatewaysRepository';

import FakeEndnodesRepository from '../repositories/fakes/FakeEndnodesRepository';
import DeleteEndnodeService from './DeleteEndnodeService';

let fakeEndnodesRepository: FakeEndnodesRepository;
let fakeGatewaysRepository: FakeGatewaysRepository;

let deleteEndnode: DeleteEndnodeService;

describe('Delete Endnode', () => {
  beforeEach(async () => {
    fakeEndnodesRepository = new FakeEndnodesRepository();
    fakeGatewaysRepository = new FakeGatewaysRepository();

    deleteEndnode = new DeleteEndnodeService(fakeEndnodesRepository);
  });

  it('should be able to delete a endnode', async () => {
    const gateway = await fakeGatewaysRepository.create({
      location: faker.random.locale(),
      ownerId: faker.random.uuid(),
    });

    const { id } = await fakeEndnodesRepository.create({
      gatewayId: gateway.id,
      name: faker.random.locale(),
      room: faker.random.locale(),
    });

    fakeEndnodesRepository.gateways.push(gateway);

    await deleteEndnode.execute({
      ownerId: gateway.ownerId,
      endnodeId: id,
    });

    const endnode = await fakeEndnodesRepository.findById(id);

    expect(endnode).toBe(undefined);
  });

  it('should not be able to delete a endnode if not yours', async () => {
    const gateway = await fakeGatewaysRepository.create({
      location: faker.random.word(),
      ownerId: 'user-id',
    });

    const endnode = await fakeEndnodesRepository.create({
      gatewayId: gateway.id,
      name: faker.random.locale(),
      room: faker.random.locale(),
    });

    fakeEndnodesRepository.gateways.push(gateway);

    await expect(
      deleteEndnode.execute({
        endnodeId: endnode.id,
        ownerId: 'another-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a non-existing endnode', async () => {
    const removeEndnode = jest.spyOn(fakeEndnodesRepository, 'remove');

    await deleteEndnode.execute({
      endnodeId: 'non-existing-endnode',
      ownerId: 'user-id',
    });

    expect(removeEndnode).not.toHaveBeenCalled();
  });
});
