import { Request, Response } from 'express';
import { escape } from 'influx/lib/src/grammar/escape';

import influx from '@shared/infra/database/influx';

type indexQuery = {
  [key: string]: number;
};

type storeBody = {
  snr: number;
  rssi: number;
  count: number;
  success: boolean;
};

class PackageController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { nodeID } = req.params;
    const { page = 1, limit = 20 } = req.query as indexQuery;

    const offset = (page - 1) * limit;

    try {
      const result = await influx.query(`
        select * from package
        where nodeID = ${escape.stringLit(nodeID)}
        order by time desc
        limit ${limit}
        offset ${offset}
      `);

      return res.json(result);
    } catch (err) {
      return res.status(500).send(err.stack);
    }
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const { nodeID } = req.params;
    const { snr, rssi, success, count } = req.body as storeBody;

    try {
      const measurement = {
        snr,
        rssi,
        count,
        success,
      };

      await influx.writePoints([
        {
          measurement: 'package',
          tags: { nodeID },
          fields: measurement,
        },
      ]);

      return res.json(measurement);
    } catch (err) {
      return res.status(500).json({ error: err.stack });
    }
  }
}

export default new PackageController();
