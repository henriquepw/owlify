import faker from 'faker';

import AppError from '@shared/Errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import FakeGatewaysRepository from '../repositories/fakes/FakeGatewaysRepository';
import ICreateGatewayDTO from '../dtos/ICreateGatewayDTO';
import CreateGatewayService from './CreateGatewayService';

let fakeUsersRepository: FakeUsersRepository;
let fakeGatewaysRepository: FakeGatewaysRepository;

let createGateway: CreateGatewayService;

let gatewayData: ICreateGatewayDTO;

describe('Create User', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeGatewaysRepository = new FakeGatewaysRepository();

    createGateway = new CreateGatewayService(
      fakeUsersRepository,
      fakeGatewaysRepository,
    );

    const { id } = await fakeUsersRepository.create({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    gatewayData = {
      userId: id,
      location: faker.random.word(),
    };
  });

  it('should be able to create a gateway', async () => {
    const gateway = await createGateway.execute(gatewayData);

    expect(gateway).toHaveProperty('id');
    expect(gateway).toEqual(expect.objectContaining(gatewayData));
  });

  it('should not be able to create a gateway with invalid user id', async () => {
    await expect(
      createGateway.execute({
        userId: 'invalid-id',
        location: gatewayData.location,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
