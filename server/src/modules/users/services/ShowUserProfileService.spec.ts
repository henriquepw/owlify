import faker from 'faker';

import AppError from '@shared/Errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import ShowUserProfileService from './ShowUserProfileService';

let fakeUsersRepository: FakeUsersRepository;

let showUserProfile: ShowUserProfileService;

describe('Show User Profile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showUserProfile = new ShowUserProfileService(fakeUsersRepository);
  });

  it('should be able to show the user profile logged', async () => {
    const user = await fakeUsersRepository.create({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    const profile = await showUserProfile.execute(user.id);

    expect(profile).toEqual(expect.objectContaining(user));
  });

  it('should not be able to show the user profile form non-existing user', async () => {
    await expect(
      showUserProfile.execute('non-existing-user-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
