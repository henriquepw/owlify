import Gateway from '../infra/typeorm/entities/Gateway';
import ICreateGatewayDTO from '../dtos/ICreateGatewayDTO';

export default interface IGatewaysRepository {
  create(data: ICreateGatewayDTO): Promise<Gateway>;
  save(gateway: Gateway): Promise<Gateway>;
  remove(gateway: Gateway): Promise<void>;

  findById(id: string): Promise<Gateway | undefined>;
  findAllFromUser(userId: string): Promise<Gateway[]>;
}
