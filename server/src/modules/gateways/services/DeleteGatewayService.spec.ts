import faker from 'faker';

import AppError from '@shared/Errors/AppError';

import FakeGatewaysRepository from '../repositories/fakes/FakeGatewaysRepository';

import DeleteGatewayService from './DeleteGatewayService';

let fakeGatewaysRepository: FakeGatewaysRepository;

let deleteGateway: DeleteGatewayService;

describe('Delete Gateway', () => {
  beforeEach(async () => {
    fakeGatewaysRepository = new FakeGatewaysRepository();

    deleteGateway = new DeleteGatewayService(fakeGatewaysRepository);
  });

  it('should be able delete a gateway', async () => {
    const ownerId = 'user-id';

    const { id } = await fakeGatewaysRepository.create({
      location: faker.random.word(),
      ownerId,
    });

    await deleteGateway.execute({
      gatewayId: id,
      ownerId,
    });

    const gateway = await fakeGatewaysRepository.findById(id);

    expect(gateway).toBe(undefined);
  });

  it('shoud not be able to delete a gateway if not yours', async () => {
    const { id: gatewayId } = await fakeGatewaysRepository.create({
      location: faker.random.word(),
      ownerId: 'another-user-id',
    });

    await expect(
      deleteGateway.execute({
        gatewayId,
        ownerId: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud not be able to delete a non-existing gateway', async () => {
    const removeGateway = jest.spyOn(fakeGatewaysRepository, 'remove');

    await deleteGateway.execute({
      gatewayId: 'non-existing-gateway',
      ownerId: 'user-id',
    });

    expect(removeGateway).not.toHaveBeenCalled();
  });
});
