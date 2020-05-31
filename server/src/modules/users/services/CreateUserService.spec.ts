import faker from 'faker';

import AppError from '@shared/Errors/AppError';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let createUser: CreateUserService;

let userData: ICreateUserDTO;

describe('Create User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    userData = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  });

  it('should be able to create a user', async () => {
    const user = await createUser.execute(userData);

    expect(user).toHaveProperty('id');
    expect(user).toEqual(expect.objectContaining(userData));
  });

  it('should encrypt user password when new user created', async () => {
    const user = await createUser.execute(userData);

    const compare = await fakeHashProvider.compareHash(
      userData.password,
      user.password,
    );

    expect(compare).toBe(true);
  });

  it('should not be able to create a user with duplicate email', async () => {
    await createUser.execute(userData);

    await expect(createUser.execute(userData)).rejects.toBeInstanceOf(AppError);
  });
});
