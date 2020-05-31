import ICreatePackageDTO from '@modules/endnodes/dtos/ICreatePacketDTO';
import IPacket from '@modules/endnodes/infra/influx/entities/Packet';

import IPacketsRepository from '../IPacketsRepository';

class FakePacketsRepository implements IPacketsRepository {
  private packaets: IPacket[] = [];

  async create({
    endnodeId,
    fields,
  }: ICreatePackageDTO): Promise<Omit<IPacket, 'time'>> {
    const measurement = {
      endnodeId,
      ...fields,
    };

    this.packaets.push({
      time: new Date().toString(),
      ...measurement,
    });

    return measurement;
  }

  async findByEndnode(endnodeId: string): Promise<IPacket[]> {
    const packaets = this.packaets.filter(p => p.endnodeId === endnodeId);

    return packaets;
  }
}

export default FakePacketsRepository;
