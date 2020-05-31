import { injectable, inject } from 'tsyringe';

import AppError from '@shared/Errors/AppError';

import IEndnodesRepository from '../repositories/IEndnodesRepository';

interface IRequest {
  endnodeId: string;
  ownerId: string;
}

@injectable()
class DeleteEndnodeService {
  constructor(
    @inject('EndnodesRepository')
    private endnodesRepository: IEndnodesRepository,
  ) {}

  public async execute({ ownerId, endnodeId }: IRequest): Promise<void> {
    /**
     * Check if the endnode is yours.
     */
    const endnode = await this.endnodesRepository.findById(endnodeId);

    if (!endnode) return;

    if (endnode.gateway.ownerId !== ownerId) {
      throw new AppError('You only can delete your endnodes.');
    }

    await this.endnodesRepository.remove(endnode);
  }
}

export default DeleteEndnodeService;
