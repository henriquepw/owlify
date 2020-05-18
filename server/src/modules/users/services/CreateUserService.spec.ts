import AppError from '@shared/Errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let createUser: CreateUserService;

const userData = {
  name: 'John Doe',
  email: 'john@example.com',
  password: '123123',
};

describe('Create User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
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
