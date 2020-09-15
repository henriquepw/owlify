import ICreatePacketDTO from '../dtos/ICreatePacketDTO';
import IListOptionsDTO from '../dtos/IListOptionsDTO';
import IPacket from '../infra/influx/entities/Packet';

export default interface IPacketsRepository {
  create(packageData: ICreatePacketDTO): Promise<Omit<IPacket, 'time'>>;

  findByEndnode(
    endnodeId: string,
    options?: IListOptionsDTO,
  ): Promise<IPacket[]>;
}
