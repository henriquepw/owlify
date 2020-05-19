import { injectable, inject } from 'tsyringe';

import IEndnodesRepository from '../repositories/IEndnodesRepository';

import Endnode from '../infra/typeorm/entities/Endnode';

@injectable()
class ListUserEndnodesService {
  constructor(
    @inject('EndnodesRepository')
    private endnodesRepository: IEndnodesRepository,
  ) {}

  public async execute(ownerId: string): Promise<Endnode[]> {
    const endnodes = await this.endnodesRepository.findAllFromUser(ownerId);

    return endnodes;
  }
}

export default ListUserEndnodesService;
