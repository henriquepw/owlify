import { injectable, inject } from 'tsyringe';

import AppError from '@shared/Errors/AppError';

import IGatewaysRepository from '@modules/gateways/repositories/IGatewaysRepository';

import ICreateEndnodeDTO from '../dtos/ICreateEndnodeDTO';
import Endnode from '../infra/typeorm/entities/Endnode';
import IEndnodesRepository from '../repositories/IEndnodesRepository';

@injectable()
class CreateEndnodeService {
  constructor(
    @inject('GatewaysRepository')
    private gatewaysRepository: IGatewaysRepository,

    @inject('EndnodesRepository')
    private endnodesRepository: IEndnodesRepository,
  ) {}

  public async execute({
    gatewayId,
    name,
    room,
  }: ICreateEndnodeDTO): Promise<Endnode | undefined> {
    /**
     * Check if gateway id is invalid
     */
    const isGatewayExists = await this.gatewaysRepository.findById(gatewayId);

    if (!isGatewayExists) {
      throw new AppError('Gateway id is invalid.');
    }

    const endnode = await this.endnodesRepository.create({
      gatewayId,
      name,
      room,
    });

    return endnode;
  }
}

export default CreateEndnodeService;
