import { injectable, inject } from 'tsyringe';

import IListOptionsDTO from '../dtos/IListOptionsDTO';
import IPacket from '../infra/influx/entities/Packet';
import IPacketsRepository from '../repositories/IPacketsRepository';

@injectable()
class ListEndnodePacketsService {
  constructor(
    @inject('PacketsRepository')
    private packetsRepository: IPacketsRepository,
  ) {}

  async execute(
    endnodeId: string,
    options?: IListOptionsDTO,
  ): Promise<IPacket[]> {
    const packets = await this.packetsRepository.findByEndnode(
      endnodeId,
      options,
    );

    return packets;
  }
}

export default ListEndnodePacketsService;
