import 'reflect-metadata';

import FakePacketsRepository from '../repositories/fakes/FakePacketsRepository';
import ListEndnodePacketsService from './ListEndnodePacketsService';

let listEndnodePackets: ListEndnodePacketsService;
let fakePacketsRepository: FakePacketsRepository;

describe('List Endnode Packets', () => {
  beforeEach(() => {
    fakePacketsRepository = new FakePacketsRepository();
    listEndnodePackets = new ListEndnodePacketsService(fakePacketsRepository);
  });

  it('shoud be able to list all endnode packets', async () => {
    const endnodeId = 'endnode-id';

    const fields = {
      snr: 1,
      rssi: 1,
      count: 1,
      success: true,
    };

    const promises = Array.from({ length: 3 }, () =>
      fakePacketsRepository.create({
        endnodeId: 'endnode-id',
        fields,
      }),
    );

    promises.push(
      fakePacketsRepository.create({
        endnodeId: 'another-endnode-id',
        fields,
      }),
    );

    const expectPackets = await Promise.all(promises);

    const packets = await listEndnodePackets.execute(endnodeId);

    packets.map(packet => expect(packet).toHaveProperty('time'));

    expect(packets.length).toBe(3);

    expect(packets).toEqual(
      expectPackets.slice(0, 3).map(packet => expect.objectContaining(packet)),
    );
  });

  it('should be able to list endnode packets with pagination', async () => {
    const endnodeId = 'endnode-id';

    const fields = {
      snr: 1,
      rssi: 1,
      count: 1,
      success: true,
    };

    const promises = Array.from({ length: 3 }, () =>
      fakePacketsRepository.create({
        endnodeId: 'endnode-id',
        fields,
      }),
    );

    promises.push(
      fakePacketsRepository.create({
        endnodeId: 'another-endnode-id',
        fields,
      }),
    );

    const expectPackets = await Promise.all(promises);

    const packets = await listEndnodePackets.execute(endnodeId, {
      limit: 2,
    });

    packets.map(packet => expect(packet).toHaveProperty('time'));

    expect(packets.length).toBe(2);

    expect(packets).toEqual(
      expectPackets.slice(0, 2).map(packet => expect.objectContaining(packet)),
    );
  });
});
