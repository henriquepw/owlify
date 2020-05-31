import ICreatePackageDTO from '../dtos/ICreatePackageDTO';
import IPackage from '../infra/influx/entities/Package';

export default interface IPackagesRepository {
  create(packageData: ICreatePackageDTO): Promise<Omit<IPackage, 'time'>>;
  findByEndnode(endnodeId: string): Promise<IPackage[]>;
}
