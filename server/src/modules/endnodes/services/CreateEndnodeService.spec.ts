import faker from 'faker';

import AppError from '@shared/Errors/AppError';

import FakeGatewaysRepository from '@modules/gateways/repositories/fakes/FakeGatewaysRepository';

import ICreateEndnodeDTO from '../dtos/ICreateEndnodeDTO';
import FakeEndnodesRepository from '../repositories/fakes/FakeEndnodesRepository';
import CreateEndnodeService from './CreateEndnodeService';

let fakeEndnodesRepository: FakeEndnodesRepository;
let fakeGatewaysRepository: FakeGatewaysRepository;

let createEndnode: CreateEndnodeService;

let endnodeData: ICreateEndnodeDTO;

let gatewayId = '';

describe('Create Endnode', () => {
  beforeEach(async () => {
    fakeEndnodesRepository = new FakeEndnodesRepository();
    fakeGatewaysRepository = new FakeGatewaysRepository();

    createEndnode = new CreateEndnodeService(
      fakeGatewaysRepository,
      fakeEndnodesRepository,
    );

    const { id } = await fakeGatewaysRepository.create({
      location: faker.random.locale(),
      ownerId: faker.random.uuid(),
    });

    gatewayId = id;

    endnodeData = {
      gatewayId,
      name: faker.random.locale(),
      room: faker.random.locale(),
    };
  });

  it('should be able to register a endnode', async () => {
    const endnode = await createEndnode.execute(endnodeData);

    expect(endnode).toHaveProperty('id');
    expect(endnode).toEqual(expect.objectContaining(endnodeData));
  });

  it('should not be able to register a endnode with invalid gateway id', async () => {
    await expect(
      createEndnode.execute({
        ...endnodeData,
        gatewayId: 'non-existing-gateway',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
