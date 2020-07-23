import { escape } from 'influx/lib/src/grammar/escape';

import influx from '@shared/infra/influx';

import ICreatePacketDTO from '@modules/endnodes/dtos/ICreatePacketDTO';
import IListOptionsDTO from '@modules/endnodes/dtos/IListOptionsDTO';
import IPacketsRepository from '@modules/endnodes/repositories/IPacketsRepository';

import IPacket from '../entities/Packet';

class PacketsRepository implements IPacketsRepository {
  async create({
    endnodeId,
    fields,
  }: ICreatePacketDTO): Promise<Omit<IPacket, 'time'>> {
    await influx.writeMeasurement('packet', [
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

  async findByEndnode(
    endnodeId: string,
    options: IListOptionsDTO = { all: true },
  ): Promise<IPacket[]> {
    const { all = false, page = 1, limit = 20 } = options;

    const offset = (Number(page) - 1) * Number(limit);

    const findOptions = all
      ? ''
      : `
        limit ${limit}
        offset ${offset}
      `;

    const packets = await influx.query<IPacket>(`
        select * from packet
        where endnodeId = ${escape.stringLit(endnodeId)}
        order by time desc
        ${findOptions}
      `);

    return packets;
  }
}

export default PacketsRepository;
