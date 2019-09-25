import { Router } from 'express';
import { escape } from 'influx';

import influx from './database';

const routes = new Router();
const { log, error } = console;

routes.use((req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    log(`Request to ${req.path} took ${duration}ms`);

    influx
      .writePoints([
        {
          measurement: 'response_times',
          tags: { host: 'test' },
          fields: { duration, path: req.path },
        },
      ])
      .catch(err => {
        error(`Error saving data to InfluxDB! ${err.stack}`);
      });
  });

  return next();
});

routes.get('/', (_, res) => res.json({ message: 'Welcome to Pandora' }));

routes.get('/times', (_, res) => {
  influx
    .query(
      `
    select * from response_times
    where host = ${escape.stringLit('test')}
    order by time desc
    limit 10
  `
    )
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(500).send(err.stack);
    });
});

export default routes;
