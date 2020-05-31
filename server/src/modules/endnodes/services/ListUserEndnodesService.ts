import { injectable, inject } from 'tsyringe';

import IListUserEndnodesDTO from '../dtos/IListUserEndnodesDTO';
import Endnode from '../infra/typeorm/entities/Endnode';
import IEndnodesRepository from '../repositories/IEndnodesRepository';

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
