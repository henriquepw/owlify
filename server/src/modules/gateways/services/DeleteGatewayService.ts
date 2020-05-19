import { injectable, inject } from 'tsyringe';

import AppError from '@shared/Errors/AppError';
import IGatewaysRepository from '../repositories/IGatewaysRepository';

interface IRequest {
  ownerId: string;
  gatewayId: string;
}

@injectable()
class DeleteGatewayService {
  constructor(
    @inject('GatewaysRepository')
    private gatewaysRepository: IGatewaysRepository,
  ) {}

  public async execute({ gatewayId, ownerId }: IRequest): Promise<void> {
    /**
     * Get gateway and check if is valid
     */
    const gateway = await this.gatewaysRepository.findById(gatewayId);

    if (!gateway) return;

    if (gateway.ownerId !== ownerId) {
      throw new AppError('You only can delete your gateways.');
    }

    await this.gatewaysRepository.remove(gateway);
  }
}

export default DeleteGatewayService;
