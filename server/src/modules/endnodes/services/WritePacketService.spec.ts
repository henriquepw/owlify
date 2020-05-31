import 'reflect-metadata';

import FakePacketsRepository from '../repositories/fakes/FakePacketsRepository';
import WritePacketService from './WritePacketService';

let writePackage: WritePacketService;
let fakePacketsRepository: FakePacketsRepository;

describe('Write Packet', () => {
  beforeEach(() => {
    fakePacketsRepository = new FakePacketsRepository();
    writePackage = new WritePacketService(fakePacketsRepository);
  });

  it('shoud be able to write a packet on database', async () => {
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
