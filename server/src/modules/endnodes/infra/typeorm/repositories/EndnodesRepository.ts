import { Repository, getRepository } from 'typeorm';

import ICreateEndnodeDTO from '@modules/endnodes/dtos/ICreateEndnodeDTO';
import IListUserEndnodesDTO from '@modules/endnodes/dtos/IListUserEndnodesDTO';
import Endnode from '@modules/endnodes/infra/typeorm/entities/Endnode';
import IEndnodesRepository from '@modules/endnodes/repositories/IEndnodesRepository';

class FakeEndnodesRepository implements IEndnodesRepository {
  private ormRepository: Repository<Endnode>;

  constructor() {
    this.ormRepository = getRepository(Endnode);
  }

  public async create(endnodeData: ICreateEndnodeDTO): Promise<Endnode> {
    const endnode = this.ormRepository.create(endnodeData);

    await this.save(endnode);

    return endnode;
  }

  public async save(endnode: Endnode): Promise<Endnode> {
    return this.ormRepository.save(endnode);
  }

  public async remove(endnode: Endnode): Promise<void> {
    await this.ormRepository.remove(endnode);
  }

  public async findById(id: string): Promise<Endnode | undefined> {
    const findEndnode = this.ormRepository.findOne(id, {
      relations: ['gateway'],
    });

    return findEndnode;
  }

  public async findAllFromGateway(gatewayId: string): Promise<Endnode[]> {
    const endnodes = this.ormRepository.find({ where: { gatewayId } });

    return endnodes;
  }

  public async findAllFromUser({
    ownerId,
    options = { all: true },
  }: IListUserEndnodesDTO): Promise<Endnode[]> {
    const { all = false, page = 1, limit = 20 } = options;

    let queryBuilder = this.ormRepository
      .createQueryBuilder('endnode')
      .leftJoinAndSelect('endnode.gateway', 'gateway')
      .where('gateway.ownerId = :ownerId', { ownerId })
      .orderBy('endnode.name', 'ASC');

    if (!all) {
      queryBuilder = queryBuilder.skip((page - 1) * limit).take(limit);
    }

    const endnodes = await queryBuilder.getMany();

    return endnodes;
  }
}

export default FakeEndnodesRepository;
