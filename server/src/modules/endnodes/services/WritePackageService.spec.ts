import 'reflect-metadata';

import FakePackagesRepository from '../repositories/fakes/FakePackagesRepository';
import WritePackageService from './WritePackageService';

let writePackage: WritePackageService;
let fakePackagesRepository: FakePackagesRepository;

describe('Write Package', () => {
  beforeEach(() => {
    fakePackagesRepository = new FakePackagesRepository();
    writePackage = new WritePackageService(fakePackagesRepository);
  });

  it('shoud be able to write a package on database', async () => {
    const measurement = {
      endnodeId: 'endnode-id',
      fields: {
        snr: 1,
        rssi: 1,
        count: 1,
        success: true,
      },
    };

    const response = await writePackage.execute(measurement);

    expect(response).toEqual({
      endnodeId: 'endnode-id',
      ...measurement.fields,
    });
  });
});
