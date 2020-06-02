import { uuid } from 'uuidv4';

import Gateway from '@modules/gateways/infra/typeorm/entities/Gateway';

import ICreateEndnodeDTO from '@modules/endnodes/dtos/ICreateEndnodeDTO';
import IListUserEndnodesDTO from '@modules/endnodes/dtos/IListUserEndnodesDTO';
import Endnode from '@modules/endnodes/infra/typeorm/entities/Endnode';

import IEndnodesRepository from '../IEndnodesRepository';

class FakeEndnodesRepository implements IEndnodesRepository {
  private endnodes: Endnode[] = [];

  gateways: Gateway[] = [];

  async create(endnodeData: ICreateEndnodeDTO): Promise<Endnode> {
    const endnode = new Endnode();

    Object.assign(endnode, endnodeData, { id: uuid() });

    this.endnodes.push(endnode);

    return endnode;
  }

  async save(endnode: Endnode): Promise<Endnode> {
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

  async remove({ id }: Endnode): Promise<void> {
    this.endnodes = this.endnodes.filter(current => current.id !== id);
  }

  async findById(id: string): Promise<Endnode | undefined> {
    const endnode = this.endnodes.find(current => current.id === id);

    const gateway = this.gateways.find(
      current => current.id === endnode?.gatewayId,
    );

    if (endnode && gateway) {
      endnode.gateway = gateway;
    }

    return endnode;
  }

  async findAllFromGateway(gatewayId: string): Promise<Endnode[]> {
    const endnodes = this.endnodes.filter(
      current => current.gatewayId === gatewayId,
    );

    return endnodes;
  }

  async findAllFromUser({
    ownerId,
    options = { all: true },
  }: IListUserEndnodesDTO): Promise<Endnode[]> {
    const gatewayIds = this.gateways
      .filter(current => current.ownerId === ownerId)
      .map(current => current.id);

    const endnodes = this.endnodes.filter(current =>
      gatewayIds.includes(current.gatewayId),
    );

    const { all = false, page = 1, limit = 20 } = options;

    if (!all) {
      return endnodes.slice((page - 1) * limit, limit * page);
    }

    return endnodes;
  }
}

export default FakeEndnodesRepository;
