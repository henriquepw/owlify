import ICreateEndnodeDTO from '../dtos/ICreateEndnodeDTO';
import IListUserEndnodesDTO from '../dtos/IListUserEndnodesDTO';
import Endnode from '../infra/typeorm/entities/Endnode';

export default interface IEndnodesRepository {
  create(data: ICreateEndnodeDTO): Promise<Endnode>;
  save(endnode: Endnode): Promise<Endnode>;
  remove(endnode: Endnode): Promise<void>;

  findById(id: string): Promise<Endnode | undefined>;
  findAllFromGateway(gatewayId: string): Promise<Endnode[]>;
  findAllFromUser(findUserData: IListUserEndnodesDTO): Promise<Endnode[]>;
}
