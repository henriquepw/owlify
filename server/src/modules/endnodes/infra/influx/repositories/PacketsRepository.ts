import { escape } from 'influx/lib/src/grammar/escape';

import influx from '@shared/infra/influx';

import ICreatePacketDTO from '@modules/endnodes/dtos/ICreatePacketDTO';
import IPacketsRepository from '@modules/endnodes/repositories/IPacketsRepository';

import IPacket from '../entities/Packet';

class PacketsRepository implements IPacketsRepository {
  async create({
    endnodeId,
    fields,
  }: ICreatePacketDTO): Promise<Omit<IPacket, 'time'>> {
    await influx.writeMeasurement('package', [
      {
        tags: { endnodeId },
        fields,
      },
    ]);

    const measurement = {
      endnodeId,
      ...fields,
    };

    return measurement;
  }

  async findByEndnode(endnodeId: string): Promise<IPacket[]> {
    const packages = await influx.query<IPacket>(`
        select * from package
        where endnodeId = ${escape.stringLit(endnodeId)}
        order by time desc

      `);

    return packages;
  }
}

export default PacketsRepository;
