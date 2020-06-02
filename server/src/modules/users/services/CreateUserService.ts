import { injectable, inject } from 'tsyringe';

import AppError from '@shared/Errors/AppError';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    /**
     * Check if use already exists
     */
    const isUserExists = await this.usersRepository.findByEmail(email);

    if (isUserExists) {
      throw new AppError('Email address already used.');
    }

    /**
     * Encrypting password
     */
    const passwordHash = await this.hashProvider.generateHash(password);

    /**
     * Create user and save on database
     */
    const user = await this.usersRepository.create({
      password: passwordHash,
      email,
      name,
    });

    return user;
  }
}

export default CreateUserService;
