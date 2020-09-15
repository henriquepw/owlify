import faker from 'faker';

import AppError from '@shared/Errors/AppError';

import User from '../infra/typeorm/entities/User';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserService from './UpdateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let updateUser: UpdateUserService;

const userData = new User();

describe('Update User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateUser = new UpdateUserService(fakeUsersRepository, fakeHashProvider);

    Object.assign(userData, {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
  });

  it('should be able to update a user', async () => {
    const { id } = await fakeUsersRepository.create(userData);

    const newUserData = {
      name: faker.name.findName(),
      email: faker.internet.email(),
    };

    const user = await updateUser.execute({
      userId: id,
      ...newUserData,
    });

    expect(user).toEqual(
      expect.objectContaining({
        ...newUserData,
      }),
    );
  });

  it('should not be able to update a user if her not exists', async () => {
    await expect(
      updateUser.execute({
        ...userData,
        userId: 'non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a user whin duplicated e-mail', async () => {
    const newUserData = {
      name: faker.name.findName(),
      email: 'in.use@email.com',
      password: faker.internet.password(),
    };

    await fakeUsersRepository.create(newUserData);
    const { id } = await fakeUsersRepository.create(userData);

    await expect(
      updateUser.execute({
        ...userData,
        userId: id,
        email: newUserData.email,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create(userData);

    const updatedUser = await updateUser.execute({
      userId: user.id,
      email: user.email,
      name: user.name,
      oldPassword: userData.password,
      password: 'new-password',
    });

    expect(updatedUser.password).toBe('new-password');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create(userData);

    expect(
      updateUser.execute({
        userId: user.id,
        email: user.email,
        name: user.name,
        password: 'new-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create(userData);

    expect(
      updateUser.execute({
        userId: user.id,
        email: user.email,
        name: user.name,
        oldPassword: 'wrong-password',
        password: 'new-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
