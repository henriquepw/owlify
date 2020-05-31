import { Request, Response } from 'express';

import { escape } from 'influx/lib/src/grammar/escape';

import influx from '@shared/infra/influx';

class SensorsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { endnodeId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const offset = (Number(page) - 1) * Number(limit);

    const result = await influx.query(`
        select * from sensor
        where endnodeId = ${escape.stringLit(endnodeId)}
        order by time desc
        limit ${limit}
        offset ${offset}
      `);

    return res.json(result);
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const { endnodeId } = req.params;
    const { snr, rssi, temperature, humidity, count } = req.body;

    await influx.writePoints([
      {
        measurement: 'sensor',
        tags: { endnodeId },
        fields: { temperature, humidity },
      },
      {
        measurement: 'package',
        tags: { endnodeId },
        fields: {
          snr,
          rssi,
          count,
          success: true,
        },
      },
    ]);

    return res.json({
      snr,
      rssi,
      count,
      temperature,
      humidity,
    });
  }
}

export default new SensorsController();
