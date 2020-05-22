import { injectable, inject } from 'tsyringe';

import IEndnodesRepository from '../repositories/IEndnodesRepository';

import Endnode from '../infra/typeorm/entities/Endnode';

@injectable()
class ListGatewayEndnodesService {
  constructor(
    @inject('EndnodesRepository')
    private endnodesRepository: IEndnodesRepository,
  ) {}

  public async execute(gatewayId: string): Promise<Endnode[]> {
    const endnodes = await this.endnodesRepository.findAllFromGateway(
      gatewayId,
    );

    return endnodes;
  }
}

export default ListGatewayEndnodesService;
