import ICreatePacketDTO from '../dtos/ICreatePacketDTO';
import Packet from '../infra/influx/entities/Packet';

export default interface IPacketsRepository {
  create(packageData: ICreatePacketDTO): Promise<Omit<Packet, 'time'>>;
  findByEndnode(endnodeId: string): Promise<Packet[]>;
}
