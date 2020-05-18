import faker from 'faker';

import AppError from '@shared/Errors/AppError';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let authenticateUser: AuthenticateUserService;

let userData: ICreateUserDTO;

describe('Create Session', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    userData = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create(userData);

    const response = await authenticateUser.execute({
      email: user.email,
      password: user.password,
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(authenticateUser.execute(userData)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      ...userData,
      password: '123123',
    });

    await expect(
      authenticateUser.execute({
        email: userData.email,
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
