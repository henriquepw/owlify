import { injectable, inject } from 'tsyringe';

import IListOptionsDTO from '../dtos/IListOptionsDTO';
import ISensor from '../infra/influx/entities/Sensor';
import ISensorsRepository from '../repositories/ISensorsRepository';

@injectable()
class ListEndnodeSensorsService {
  constructor(
    @inject('SensorsRepository')
    private sensorsRepository: ISensorsRepository,
  ) {}

  async execute(
    endnodeId: string,
    options?: IListOptionsDTO,
  ): Promise<ISensor[]> {
    const sensors = await this.sensorsRepository.findByEndnode(
      endnodeId,
      options,
    );

    return sensors;
  }
}

export default ListEndnodeSensorsService;
