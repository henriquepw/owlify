import { injectable, inject } from 'tsyringe';

import AppError from '@shared/Errors/AppError';
import IGatewaysRepository from '../repositories/IGatewaysRepository';

interface IRequest {
  userId: string;
  gatewayId: string;
}

@injectable()
class DeleteGatewayService {
  constructor(
    @inject('GatewaysRepository')
    private gatewaysRepository: IGatewaysRepository,
  ) {}

  public async execute({ gatewayId, userId }: IRequest): Promise<void> {
    /**
     * Get gateway and check if is valid
     */
    const gateway = await this.gatewaysRepository.findById(gatewayId);

    if (!gateway) return;

    if (gateway.userId !== userId) {
      throw new AppError('You only can delete your gateways.');
    }

    await this.gatewaysRepository.remove(gateway);
  }
}

export default DeleteGatewayService;
