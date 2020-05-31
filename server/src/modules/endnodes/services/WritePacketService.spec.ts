import 'reflect-metadata';

import FakePacketRepository from '../repositories/fakes/FakePacketRepository';
import WritePacketService from './WritePacketService';

let writePackage: WritePacketService;
let fakePacketRepository: FakePacketRepository;

describe('Write Packet', () => {
  beforeEach(() => {
    fakePacketRepository = new FakePacketRepository();
    writePackage = new WritePacketService(fakePacketRepository);
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
