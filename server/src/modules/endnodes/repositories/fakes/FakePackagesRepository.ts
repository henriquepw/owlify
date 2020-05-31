import ICreatePackageDTO from '@modules/endnodes/dtos/ICreatePackageDTO';
import IPackage from '@modules/endnodes/infra/influx/entities/Package';

import IPackagesRepository from '../IPackagesRepository';

class FakePackagesRepository implements IPackagesRepository {
  private packages: IPackage[] = [];

  async create({
    endnodeId,
    fields,
  }: ICreatePackageDTO): Promise<Omit<IPackage, 'time'>> {
    const measurement = {
      endnodeId,
      ...fields,
    };

    this.packages.push({
      time: new Date().toString(),
      ...measurement,
    });

    return measurement;
  }

  async findByEndnode(endnodeId: string): Promise<IPackage[]> {
    const packages = this.packages.filter(p => p.endnodeId === endnodeId);

    return packages;
  }
}

export default FakePackagesRepository;
