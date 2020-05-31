import { Repository, getRepository } from 'typeorm';

import ICreateGatewayDTO from '@modules/gateways/dtos/ICreateGatewayDTO';
import Gateway from '@modules/gateways/infra/typeorm/entities/Gateway';
import IGatewaysRepository from '@modules/gateways/repositories/IGatewaysRepository';

class GatewaysRepository implements IGatewaysRepository {
  private ormRepository: Repository<Gateway>;

  constructor() {
    this.ormRepository = getRepository(Gateway);
  }

  public async create(gatewayData: ICreateGatewayDTO): Promise<Gateway> {
    const gateway = this.ormRepository.create(gatewayData);

    await this.save(gateway);

    return gateway;
  }

  public async save(gateway: Gateway): Promise<Gateway> {
    return this.ormRepository.save(gateway);
  }

  public async remove(gateway: Gateway): Promise<void> {
    await this.ormRepository.remove(gateway);
  }

  public async findById(gatewayId: string): Promise<Gateway | undefined> {
    const findGateway = this.ormRepository.findOne(gatewayId, {
      relations: ['owner'],
    });

    return findGateway;
  }

  public async findAllFromUser(ownerId: string): Promise<Gateway[]> {
    const gateways = this.ormRepository.find({
      where: { ownerId },
    });

    return gateways;
  }
}

export default GatewaysRepository;
