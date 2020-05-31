import { escape } from 'influx/lib/src/grammar/escape';

import influx from '@shared/infra/influx';

import ICreateSensorDTO from '@modules/endnodes/dtos/ICreateSensorDTO';
import IListOptionsDTO from '@modules/endnodes/dtos/IListOptionsDTO';
import ISensorsRepository from '@modules/endnodes/repositories/ISensorsRepository';

import ISensor from '../entities/Sensor';

class SensorsRepository implements ISensorsRepository {
  async create({
    endnodeId,
    fields,
  }: ICreateSensorDTO): Promise<Omit<ISensor, 'time'>> {
    const { temperature, humidity, snr, rssi, count } = fields;
    const tags = { endnodeId };

    await influx.writePoints([
      {
        measurement: 'sensor',
        tags,
        fields: { temperature, humidity },
      },
      {
        measurement: 'packet',
        tags,
        fields: {
          snr,
          rssi,
          count,
          success: true,
        },
      },
    ]);

    const measurement = {
      endnodeId,
      temperature,
      humidity,
    };

    return measurement;
  }

  async findByEndnode(
    endnodeId: string,
    options: IListOptionsDTO = { all: true },
  ): Promise<ISensor[]> {
    const { all = false, page = 1, limit = 20 } = options;

    const offset = (Number(page) - 1) * Number(limit);

    const findOptions = all
      ? ''
      : `
        limit ${limit}
        offset ${offset}
      `;

    const sensorsData = await influx.query<ISensor>(`
        select * from sensor
        where endnodeId = ${escape.stringLit(endnodeId)}
        order by time desc
        ${findOptions}
      `);

    return sensorsData;
  }
}

export default SensorsRepository;
