import { injectable, inject } from 'tsyringe';

import AppError from '@shared/Errors/AppError';

import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  userId: string;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    userId,
    name,
    email,
    password,
    oldPassword,
  }: IRequest): Promise<User> {
    /**
     * Check if use exists
     */
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.');
    }

    /**
     * Check if new e-mail already in use.
     */
    const checkEmail = await this.usersRepository.findByEmail(email);

    if (checkEmail && checkEmail.id !== userId) {
      throw new AppError('E-mail already in use.');
    }

    user.name = name;
    user.email = email;

    if (password) {
      if (!oldPassword) {
        throw new AppError(
          'You need to inform the old password to set a new password.',
        );
      }

      const checkOldPassword = await this.hashProvider.compareHash(
        oldPassword,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateUserService;
