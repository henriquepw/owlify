import ICreateSensorDTO from '../dtos/ICreateSensorDTO';
import IListOptionsDTO from '../dtos/IListOptionsDTO';
import Sensor from '../infra/influx/entities/Sensor';

export default interface ISensorsRepository {
  create(packageData: ICreateSensorDTO): Promise<Omit<Sensor, 'time'>>;

  findByEndnode(
    endnodeId: string,
    options?: IListOptionsDTO,
  ): Promise<Sensor[]>;
}
