import { injectable, inject } from 'tsyringe';

import AppError from '@shared/Errors/AppError';
import IEndnodesRepository from '../repositories/IEndnodesRepository';

import Endnode from '../infra/typeorm/entities/Endnode';

interface IRequest {
  ownerId: string;
  endnodeId: string;
  name: string;
  room: string;
}

@injectable()
class UpdateEndnodeService {
  constructor(
    @inject('EndnodesRepository')
    private endnodesRepository: IEndnodesRepository,
  ) {}

  public async execute({
    ownerId,
    endnodeId,
    name,
    room,
  }: IRequest): Promise<Endnode> {
    /**
     * Get endnode and check if is invalid
     */
    const endnode = await this.endnodesRepository.findById(endnodeId);

    if (!endnode) {
      throw new AppError('Endnode does not exists.');
    }

    if (endnode.gateway.ownerId !== ownerId) {
      throw new AppError('You can only update your endnodes.');
    }

    // Update data
    endnode.name = name;
    endnode.room = room;

    await this.endnodesRepository.save(endnode);

    return endnode;
  }
}

export default UpdateEndnodeService;
