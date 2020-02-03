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
  success: boolean;
};

class PackageController {
  public async index(req: Request, res: Response) {
    const { host } = req.params;
    const { page = 1 } = req.query as indexQuery;

    try {
      const result = await influx.query(`
        select * from package
        where host = ${escape.stringLit(host)}
        order by time desc
        limit ${page * 50}
      `);

      return res.json(result);
    } catch (err) {
      return res.status(500).send(err.stack);
    }
  }

  public async store(req: Request, res: Response) {
    const { host } = req.params;
    const {
      id,
      snr,
      rssi,
      success,
    } = req.body as storeBody;

    try {
      const measurement = {
        id,
        snr,
        rssi,
        success,
      };

      await influx.writePoints([
        {
          measurement: 'package',
          tags: { host },
          fields: measurement,
        },
      ]);

      return res.json(measurement);
    } catch (err) {
      return res.status(500).send(err.stack);
    }
  }
}

export default new PackageController();
