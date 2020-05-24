import { injectable, inject } from 'tsyringe';

import IEndnodesRepository from '../repositories/IEndnodesRepository';

import Endnode from '../infra/typeorm/entities/Endnode';
import IListUserEndnodesDTO from '../dtos/IListUserEndnodesDTO';

@injectable()
class ListUserEndnodesService {
  constructor(
    @inject('EndnodesRepository')
    private endnodesRepository: IEndnodesRepository,
  ) {}

  public async execute({
    ownerId,
    options,
  }: IListUserEndnodesDTO): Promise<Endnode[]> {
    const endnodes = await this.endnodesRepository.findAllFromUser({
      ownerId,
      options,
    });

    return endnodes;
  }
}

export default ListUserEndnodesService;
