import { escape } from 'influx';

import influx from '../../database';

class SensorController {
  async index(req, res) {
    const { host } = req.params;

    try {
      const result = await influx.query(`
        select * from sensor
        where host = ${escape.stringLit(host)}
        order by time desc
        limit 10
      `);

      res.json(result);
    } catch (err) {
      res.status(500).send(err.stack);
    }
  }

  async store(req, res) {
    const { host } = req.params;
    const { temperature, humidity } = req.body;

    try {
      await influx.writePoints([
        {
          measurement: 'sensor',
          tags: { host },
          fields: { temperature, humidity },
        },
      ]);

      res.json({ temperature, humidity });
    } catch (err) {
      res.status(500).send(err.stack);
    }
  }
}

export default new SensorController();
