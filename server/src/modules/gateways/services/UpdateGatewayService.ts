import { injectable, inject } from 'tsyringe';

import AppError from '@shared/Errors/AppError';

import Gateway from '../infra/typeorm/entities/Gateway';
import IGatewaysRepository from '../repositories/IGatewaysRepository';

interface IRequest {
  ownerId: string;
  gatewayId: string;
  location: string;
}

@injectable()
class UpdateGatewayService {
  constructor(
    @inject('GatewaysRepository')
    private gatewaysRepository: IGatewaysRepository,
  ) {}

  public async execute({
    ownerId,
    gatewayId,
    location,
  }: IRequest): Promise<Gateway> {
    /**
     * Get gateway and check if is valid
     */
    const gateway = await this.gatewaysRepository.findById(gatewayId);

    if (!gateway) {
      throw new AppError('Gateway does not exists.');
    }

    if (gateway.ownerId !== ownerId) {
      throw new AppError('You can only update your gateways.');
    }

    // Update location value
    gateway.location = location;

    // update gateway on database
    await this.gatewaysRepository.save(gateway);

    return gateway;
  }
}

export default UpdateGatewayService;
