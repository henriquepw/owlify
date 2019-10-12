import { escape } from 'influx/lib/src/grammar/escape';

import influx from '../../database';

class PackageController {
  async index(req, res) {
    const { host } = req.params;
    const { page = 1 } = req.query;

    try {
      const result = await influx.query(`
        select * from package
        where host = ${escape.stringLit(host)}
        order by time desc
        limit ${page * 50}
      `);

      res.json(result);
    } catch (err) {
      res.status(500).send(err.stack);
    }
  }

  async store(req, res) {
    const { host } = req.params;
    const { id, snr, rssi, success } = req.body;

    try {
      await influx.writePoints([
        {
          measurement: 'package',
          tags: { host },
          fields: { id, snr, rssi, success },
        },
      ]);

      res.json({ id, snr, rssi, success });
    } catch (err) {
      res.status(500).send(err.stack);
    }
  }
}

export default new PackageController();
