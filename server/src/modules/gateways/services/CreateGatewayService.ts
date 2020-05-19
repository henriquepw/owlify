import { injectable, inject } from 'tsyringe';

import AppError from '@shared/Errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IGatewaysRepository from '../repositories/IGatewaysRepository';
import ICreateGatewayDTO from '../dtos/ICreateGatewayDTO';

import Gateway from '../infra/typeorm/entities/Gateway';

@injectable()
class CreateGatewayService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('GatewaysRepository')
    private gatewaysRepository: IGatewaysRepository,
  ) {}

  public async execute({
    userId,
    location,
  }: ICreateGatewayDTO): Promise<Gateway> {
    /**
     * Check if user id is invalid
     */
    const isUserExists = await this.usersRepository.findById(userId);

    if (!isUserExists) {
      throw new AppError('User id is invalid.');
    }

    /**
     * Create gateway and save on database
     */
    const gateway = await this.gatewaysRepository.create({
      userId,
      location,
    });

    return gateway;
  }
}

export default CreateGatewayService;