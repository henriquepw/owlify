import { Request, Response } from 'express';
import { escape } from 'influx/lib/src/grammar/escape';

import influx from '../../database/influx';

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
    const { nodeID } = req.params;
    const { page = 1 } = req.query as indexQuery;

    try {
      const result = await influx.query(`
        select * from package
        where nodeID = ${escape.stringLit(nodeID)}
        order by time desc
        limit ${page * 50}
      `);

      return res.json(result);
    } catch (err) {
      return res.status(500).send(err.stack);
    }
  }

  public async store(req: Request, res: Response) {
    const { nodeID } = req.params;
    const { snr, rssi, success } = req.body as storeBody;

    try {
      const measurement = {
        snr,
        rssi,
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
