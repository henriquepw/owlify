import { Request, Response } from 'express';
import { escape } from 'influx/lib/src/grammar/escape';

import influx from '../../database/influx';

type indexQuery = {
  page: number;
};

type storeBody = {
  snr: number;
  rssi: number;
  count: number;
  temperature: number;
  humidity: number;
};

class SensorController {
  async index(req: Request, res: Response) {
    const { nodeID } = req.params;
    const { page = 1 } = req.query as indexQuery;

    try {
      const result = await influx.query(`
        select * from sensor
        where nodeID = ${escape.stringLit(nodeID)}
        order by time desc
        limit ${page * 50}
      `);

      return res.json(result);
    } catch (err) {
      return res.status(500).send(err.stack);
    }
  }

  async store(req: Request, res: Response) {
    const { nodeID } = req.params;
    const { snr, rssi, temperature, humidity, count } = req.body as storeBody;

    try {
      await influx.writePoints([
        {
          measurement: 'sensor',
          tags: { nodeID },
          fields: { temperature, humidity },
        },
        {
          measurement: 'package',
          tags: { nodeID },
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
        temperature,
        humidity,
      });
    } catch (err) {
      return res.status(500).json({ error: err.stack });
    }
  }
}

export default new SensorController();
