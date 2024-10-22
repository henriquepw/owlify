import faker from 'faker';

import AppError from '@shared/Errors/AppError';

import FakeGatewaysRepository from '../repositories/fakes/FakeGatewaysRepository';
import UpdateGatewayService from './UpdateGatewayService';

let fakeGatewaysRepository: FakeGatewaysRepository;

let updateGateway: UpdateGatewayService;

let location = '';

describe('Update Gateway', () => {
  beforeEach(async () => {
    fakeGatewaysRepository = new FakeGatewaysRepository();

    updateGateway = new UpdateGatewayService(fakeGatewaysRepository);

    location = faker.random.locale();
  });

  it('should be able update a gateway', async () => {
    const ownerId = 'user-id';

    const { id } = await fakeGatewaysRepository.create({
      location: faker.random.word(),
      ownerId,
    });

    await updateGateway.execute({
      gatewayId: id,
      location,
      ownerId,
    });

    const updatedGateway = await fakeGatewaysRepository.findById(id);

    expect(updatedGateway).toEqual(expect.objectContaining({ location }));
  });

  it('shoud not be able to update a gateway if not yours', async () => {
    const { id: gatewayId } = await fakeGatewaysRepository.create({
      location,
      ownerId: 'another-user-id',
    });

    await expect(
      updateGateway.execute({
        ownerId: 'user-id',
        gatewayId,
        location,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud not be able to update a non-existing gateway', async () => {
    await expect(
      updateGateway.execute({
        gatewayId: 'non-existing-gateway',
        ownerId: 'user-id',
        location,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
