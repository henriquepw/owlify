import ICreateSensorDTO from '@modules/endnodes/dtos/ICreateSensorDTO';
import IListOptionsDTO from '@modules/endnodes/dtos/IListOptionsDTO';
import ISensor from '@modules/endnodes/infra/influx/entities/Sensor';

import ISensorsRepository from '../ISensorsRepository';

class FakeSensorsRepository implements ISensorsRepository {
  private sensorsData: ISensor[] = [];

  async create({
    endnodeId,
    fields,
  }: ICreateSensorDTO): Promise<Omit<ISensor, 'time'>> {
    const measurement = {
      endnodeId,
      ...fields,
    };

    this.sensorsData.push({
      time: new Date().toString(),
      ...measurement,
    });

    return measurement;
  }

  async findByEndnode(
    endnodeId: string,
    options: IListOptionsDTO = { all: true },
  ): Promise<ISensor[]> {
    const { all = false, page = 1, limit = 20 } = options;

    const sensors = this.sensorsData.filter(
      sensor => sensor.endnodeId === endnodeId,
    );

    if (!all) {
      return sensors.slice((page - 1) * limit, limit * page);
    }

    return sensors;
  }
}

export default FakeSensorsRepository;
