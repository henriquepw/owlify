import ICreatePacketDTO from '@modules/endnodes/dtos/ICreatePacketDTO';
import IListOptionsDTO from '@modules/endnodes/dtos/IListOptionsDTO';
import IPacket from '@modules/endnodes/infra/influx/entities/Packet';

import IPacketsRepository from '../IPacketsRepository';

class FakePacketsRepository implements IPacketsRepository {
  private packets: IPacket[] = [];

  async create({
    endnodeId,
    fields,
  }: ICreatePacketDTO): Promise<Omit<IPacket, 'time'>> {
    const measurement = {
      endnodeId,
      ...fields,
    };

    this.packets.push({
      time: new Date().toString(),
      ...measurement,
    });

    return measurement;
  }

  async findByEndnode(
    endnodeId: string,
    options: IListOptionsDTO = { all: true },
  ): Promise<IPacket[]> {
    const { all = false, page = 1, limit = 20 } = options;

    const packets = this.packets.filter(p => p.endnodeId === endnodeId);

    if (!all) {
      return packets.slice((page - 1) * limit, limit * page);
    }

    return packets;
  }
}

export default FakePacketsRepository;
