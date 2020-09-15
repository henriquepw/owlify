import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import authConfig from '@config/auth';

import AppError from '@shared/Errors/AppError';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

export interface IRequest {
  email: string;
  password: string;
}

export interface IResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    /**
     * Check if user exists
     */
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password.', 401);
    }

    /**
     * Check if password matched
     */
    const isPasswordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!isPasswordMatched) {
      throw new AppError('Incorrect email/password.', 401);
    }

    /**
     * Create Token
     */
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      token,
      user,
    };
  }
}

export default AuthenticateUserService;
