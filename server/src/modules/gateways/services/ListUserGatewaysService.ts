import { injectable, inject } from 'tsyringe';

import IGatewaysRepository from '../repositories/IGatewaysRepository';

import Gateway from '../infra/typeorm/entities/Gateway';

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
