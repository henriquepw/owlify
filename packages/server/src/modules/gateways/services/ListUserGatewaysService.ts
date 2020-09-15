import { injectable, inject } from 'tsyringe';

import Gateway from '../infra/typeorm/entities/Gateway';
import IGatewaysRepository from '../repositories/IGatewaysRepository';

@injectable()
class ListUserGatewaysService {
  constructor(
    @inject('GatewaysRepository')
    private gatewaysRepository: IGatewaysRepository,
  ) {}

  public async execute(ownerId: string): Promise<Gateway[]> {
    const gateways = await this.gatewaysRepository.findAllFromUser(ownerId);

    return gateways;
  }
}

export default ListUserGatewaysService;
