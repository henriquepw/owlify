import ICreateGatewayDTO from '../dtos/ICreateGatewayDTO';
import Gateway from '../infra/typeorm/entities/Gateway';

export default interface IGatewaysRepository {
  create(data: ICreateGatewayDTO): Promise<Gateway>;
  save(gateway: Gateway): Promise<Gateway>;
  remove(gateway: Gateway): Promise<void>;

  findById(id: string): Promise<Gateway | undefined>;
  findAllFromUser(ownerId: string): Promise<Gateway[]>;
}
