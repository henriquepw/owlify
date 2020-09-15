import { injectable, inject } from 'tsyringe';

import Endnode from '../infra/typeorm/entities/Endnode';
import IEndnodesRepository from '../repositories/IEndnodesRepository';

@injectable()
class ListGatewayEndnodesService {
  constructor(
    @inject('EndnodesRepository')
    private endnodesRepository: IEndnodesRepository,
  ) {}

  async execute(gatewayId: string): Promise<Endnode[]> {
    const endnodes = await this.endnodesRepository.findAllFromGateway(
      gatewayId,
    );

    return endnodes;
  }
}

export default ListGatewayEndnodesService;
