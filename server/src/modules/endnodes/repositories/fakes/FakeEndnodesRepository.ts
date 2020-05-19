import { uuid } from 'uuidv4';

import Gateway from '@modules/gateways/infra/typeorm/entities/Gateway';
import Endnode from '@modules/endnodes/infra/typeorm/entities/Endnode';

import ICreateEndnodeDTO from '@modules/endnodes/dtos/ICreateEndnodeDTO';

import IEndnodesRepository from '../IEndnodesRepository';

class FakeEndnodesRepository implements IEndnodesRepository {
  public gateways: Gateway[] = [];

  private endnodes: Endnode[] = [];

  public async create(endnodeData: ICreateEndnodeDTO): Promise<Endnode> {
    const endnode = new Endnode();

    Object.assign(endnode, endnodeData, { id: uuid() });

    this.endnodes.push(endnode);

    return endnode;
  }

  public async save(endnode: Endnode): Promise<Endnode> {
    const findIndex = this.endnodes.findIndex(
      current => current.id === endnode.id,
    );

    if (findIndex) {
      this.endnodes[findIndex] = endnode;
    } else {
      this.endnodes.push(endnode);
    }

    return endnode;
  }

  public async remove({ id }: Endnode): Promise<void> {
    this.endnodes = this.endnodes.filter(current => current.id !== id);
  }

  public async findById(id: string): Promise<Endnode | undefined> {
    const endnode = this.endnodes.find(current => current.id === id);

    const gateway = this.gateways.find(
      current => current.id === endnode?.gatewayId,
    );

    if (endnode && gateway) {
      endnode.gateway = gateway;
    }

    return endnode;
  }

  public async findAllFromGateway(gatewayId: string): Promise<Endnode[]> {
    const endnodes = this.endnodes.filter(
      current => current.gatewayId === gatewayId,
    );

    return endnodes;
  }
}

export default FakeEndnodesRepository;