import { Request, Response } from 'express';
import { escape } from 'influx/lib/src/grammar/escape';

import influx from '../../database';

type indexQuery = {
  page: number;
};

type storeBody = {
  id: number;
  snr: number;
  rssi: number;
  temperature: number;
  humidity: number;
};

class SensorController {
  async index(req: Request, res: Response) {
    const { host } = req.params;
    const { page = 1 } = req.query as indexQuery;

    try {
      const result = await influx.query(`
        select * from sensor
        where host = ${escape.stringLit(host)}
        order by time desc
        limit ${page * 50}
      `);

      return res.json(result);
    } catch (err) {
      return res.status(500).send(err.stack);
    }
  }

  async store(req: Request, res: Response) {
    const { host } = req.params;
    const {
      id,
      snr,
      rssi,
      temperature,
      humidity,
    } = req.body as storeBody;

    try {
      await influx.writePoints([
        {
          measurement: 'sensor',
          tags: { host },
          fields: { temperature, humidity },
        },
        {
          measurement: 'package',
          tags: { host },
          fields: {
            id,
            snr,
            rssi,
            success: true,
          },
        },
      ]);

      return res.json({
        id,
        snr,
        rssi,
        temperature,
        humidity,
      });
    } catch (err) {
      return res.status(500).send(err.stack);
    }
  }
}

export default new SensorController();
