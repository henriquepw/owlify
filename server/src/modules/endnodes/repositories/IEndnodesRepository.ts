import Endnode from '../infra/typeorm/entities/Endnode';
import ICreateEndnodeDTO from '../dtos/ICreateEndnodeDTO';

export default interface IEndnodesRepository {
  create(data: ICreateEndnodeDTO): Promise<Endnode>;
  save(endnode: Endnode): Promise<Endnode>;
  remove(endnode: Endnode): Promise<void>;

  findById(id: string): Promise<Endnode | undefined>;
  findAllFromGateway(gatewayId: string): Promise<Endnode[]>;
}
