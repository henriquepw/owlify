import faker from 'faker';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import DeleteUserService from './DeleteUserService';

let fakeUsersRepository: FakeUsersRepository;

let deleteUser: DeleteUserService;

let userData: ICreateUserDTO;

describe('Delete User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    deleteUser = new DeleteUserService(fakeUsersRepository);

    userData = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  });

  it('should be able to delete a user', async () => {
    const user = await fakeUsersRepository.create(userData);

    await deleteUser.execute(user.id);

    const findUser = await fakeUsersRepository.findById(user.id);

    expect(findUser).toBe(undefined);
  });

  it('should not be able to delete a user if is not exists', async () => {
    const removeUser = jest.spyOn(fakeUsersRepository, 'remove');

    await deleteUser.execute('invalid-user-id');

    expect(removeUser).not.toHaveBeenCalled();
  });
});
