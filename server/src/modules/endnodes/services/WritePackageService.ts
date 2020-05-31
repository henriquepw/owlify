import { injectable, inject } from 'tsyringe';

import ICreatePackageDTO from '../dtos/ICreatePackageDTO';
import IPackage from '../infra/influx/entities/Package';
import IPackagesRepository from '../repositories/IPackagesRepository';

@injectable()
class WritePackageService {
  constructor(
    @inject('PackagesRepository')
    private packagesRepository: IPackagesRepository,
  ) {}

  async execute({
    endnodeId,
    fields,
  }: ICreatePackageDTO): Promise<Omit<IPackage, 'time'>> {
    const measurement = await this.packagesRepository.create({
      endnodeId,
      fields,
    });

    return measurement;
  }
}

export default WritePackageService;
