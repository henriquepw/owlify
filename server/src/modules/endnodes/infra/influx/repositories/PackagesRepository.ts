import { escape } from 'influx/lib/src/grammar/escape';

import influx from '@shared/infra/influx';

import ICreatePackageDTO from '@modules/endnodes/dtos/ICreatePackageDTO';
import IPackagesRepository from '@modules/endnodes/repositories/IPackagesRepository';

import IPackage from '../entities/Package';

class PackagesRepository implements IPackagesRepository {
  async create({
    endnodeId,
    fields,
  }: ICreatePackageDTO): Promise<Omit<IPackage, 'time'>> {
    await influx.writeMeasurement('package', [
      {
        tags: { endnodeId },
        fields,
      },
    ]);

    const measurement = {
      endnodeId,
      ...fields,
    };

    return measurement;
  }

  async findByEndnode(endnodeId: string): Promise<IPackage[]> {
    const packages = await influx.query<IPackage>(`
        select * from package
        where endnodeId = ${escape.stringLit(endnodeId)}
        order by time desc

      `);

    return packages;
  }
}

export default PackagesRepository;
