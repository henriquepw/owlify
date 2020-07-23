import { uuid } from 'uuidv4';

import ICreateGatewayDTO from '@modules/gateways/dtos/ICreateGatewayDTO';
import Gateway from '@modules/gateways/infra/typeorm/entities/Gateway';

import IGatewaysRepository from '../IGatewaysRepository';

class FakeGatewaysRepository implements IGatewaysRepository {
  private gateways: Gateway[] = [];

  public async create(gatewayData: ICreateGatewayDTO): Promise<Gateway> {
    const gateway = new Gateway();

    Object.assign(gateway, gatewayData, { id: uuid() });

    this.gateways.push(gateway);

    return gateway;
  }

  public async save(gateway: Gateway): Promise<Gateway> {
    const findIndex = this.gateways.findIndex(
      current => current.id === gateway.id,
    );

    if (findIndex) {
      this.gateways[findIndex] = gateway;
    } else {
      this.gateways.push(gateway);
    }

    return gateway;
  }

  public async remove({ id }: Gateway): Promise<void> {
    this.gateways = this.gateways.filter(current => current.id !== id);
  }

  public async findById(id: string): Promise<Gateway | undefined> {
    const findGateway = this.gateways.find(current => current.id === id);

    return findGateway;
  }

  public async findAllFromUser(ownerId: string): Promise<Gateway[]> {
    const gateways = this.gateways.filter(
      current => current.ownerId === ownerId,
    );

    return gateways;
  }
}

export default FakeGatewaysRepository;
