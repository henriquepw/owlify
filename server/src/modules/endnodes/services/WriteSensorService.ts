import { injectable, inject } from 'tsyringe';

import ICreateSensorDTO from '../dtos/ICreateSensorDTO';
import ISensor from '../infra/influx/entities/Sensor';
import ISensorsRepository from '../repositories/ISensorsRepository';

@injectable()
class WriteSensorService {
  constructor(
    @inject('SensorsRepository')
    private sensorsRepository: ISensorsRepository,
  ) {}

  async execute({
    endnodeId,
    fields,
  }: ICreateSensorDTO): Promise<Omit<ISensor, 'time'>> {
    const measurement = await this.sensorsRepository.create({
      endnodeId,
      fields,
    });

    return measurement;
  }
}

export default WriteSensorService;
