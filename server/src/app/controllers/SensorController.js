import { escape } from 'influx/lib/src/grammar/escape';

import influx from '../../database';

class SensorController {
  async index(req, res) {
    const { host } = req.params;
    const { page = 1 } = req.query;

    try {
      const result = await influx.query(`
        select * from sensor
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
    const { id, rssi, temperature, humidity } = req.body;

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
          fields: { id, rssi, success: true },
        },
      ]);

      res.json({ id, rssi, temperature, humidity });
    } catch (err) {
      res.status(500).send(err.stack);
    }
  }
}

export default new SensorController();
