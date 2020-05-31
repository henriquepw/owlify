import { injectable, inject } from 'tsyringe';

import ICreatePacketDTO from '../dtos/ICreatePacketDTO';
import IPacket from '../infra/influx/entities/Packet';
import IPacketsRepository from '../repositories/IPacketsRepository';

@injectable()
class WritePackageService {
  constructor(
    @inject('PacketsRepository')
    private packetsRepository: IPacketsRepository,
  ) {}

  async execute({
    endnodeId,
    fields,
  }: ICreatePacketDTO): Promise<Omit<IPacket, 'time'>> {
    const measurement = await this.packetsRepository.create({
      endnodeId,
      fields,
    });

    return measurement;
  }
}

export default WritePackageService;
