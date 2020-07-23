import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListEndnodePacketsService from '@modules/endnodes/services/ListEndnodePacketsService';
import WritePacketService from '@modules/endnodes/services/WritePacketService';

class PacketController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { endnodeId } = req.params;
    const { page = 1, limit = 20, all = false } = req.query;

    const listEndnodePackets = container.resolve(ListEndnodePacketsService);

    const packetsData = await listEndnodePackets.execute(endnodeId, {
      page: Number(page),
      limit: Number(limit),
      all: all === 'true',
    });

    return res.json(packetsData);
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const { endnodeId } = req.params;
    const { snr, rssi, success, count } = req.body;

    const writePacket = container.resolve(WritePacketService);

    const measurement = await writePacket.execute({
      endnodeId,
      fields: {
        snr,
        rssi,
        count,
        success,
      },
    });

    return res.json(measurement);
  }
}

export default new PacketController();
