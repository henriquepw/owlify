import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListEndnodeSensorsService from '@modules/endnodes/services/ListEndnodeSensorsService';
import WriteSensorService from '@modules/endnodes/services/WriteSensorService';

class SensorsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { endnodeId } = req.params;
    const { page = 1, limit = 20, all } = req.query;

    const listEndnodeSensors = container.resolve(ListEndnodeSensorsService);

    const sensorsData = await listEndnodeSensors.execute(endnodeId, {
      page: Number(page),
      limit: Number(limit),
      all: all === 'true',
    });

    return res.json(sensorsData);
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const { endnodeId } = req.params;
    const { snr, rssi, temperature, humidity, count } = req.body;

    const writeSensors = container.resolve(WriteSensorService);

    const measurement = await writeSensors.execute({
      endnodeId,
      fields: {
        temperature,
        humidity,
        count,
        rssi,
        snr,
      },
    });

    return res.json(measurement);
  }
}

export default new SensorsController();
